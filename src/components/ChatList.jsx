import "../css/ChatList.css";
// import chats from "../mocks/dataChats.json";
import { funcSelectChats } from "../mocks/chats.js";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { supabase } from "../App.jsx";
import Prueba from "./Prueba.jsx";

/* mapea los chats que está en los mocks/chats.js y los muestra en la lista de chats  
debes pensar donde hacer el fetch, si pasarlo como props... pero no lo dejes como variable global
*/
/* eslint-disable react/prop-types */
function ChatList({selectedChat, setSelectedChat, selectedChatMessages, setSelectedChatMessages, chats, setChats, usuario, oldId, setOldId}) {


    const channel = supabase.channel('conversations')
    const [loading, setLoading] = useState(true)

    const [activeNotification, setActiveNotification] = useState(null);

    const requestPermission = async () => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications");
            return;
        }

        if (Notification.permission !== "granted") {
            await Notification.requestPermission();
        }
    };

    const sendNotification = (payload, duration = 5000) => {
        if (Notification.permission === "granted") {
            // Close previous notification if it exists
            if (activeNotification) {
                activeNotification.close();
            }
            let notification
            if(payload.eventType === "INSERT"){

                if(payload.new.participants.length===2){
                    notification = new Notification(`${payload.new.created_by}`, {
                        body: `@${payload.new.created_by} te ha agregado como contacto nuevo `,
                        icon: "/chat.svg",
                        silent: false,
                        requireInteraction: false,
                        tag: "whatsapp-notification", // Same tag for replacement
                    });
                }
                else if(payload.new.participants.length>2){
                    notification = new Notification(`${payload.new.nombreGrupo}`, {
                        body: `@${payload.new.created_by} te ha añadido al grupo. `,
                        icon: "/chat.svg",
                        silent: false,
                        requireInteraction: false,
                        tag: "whatsapp-notification", // Same tag for replacement
                    });
                }

            } else if(payload.eventType === "UPDATE"){

                if(payload.new.participants.length===2){
                    notification = new Notification(`${payload.new.messages.at(-1).at(0)}`, {
                        body: `${payload.new.messages.at(-1).at(1)}`,
                        icon: "/chat.svg",
                        silent: false,
                        requireInteraction: false,
                        tag: "whatsapp-notification",
                    });
                }
                else if(payload.new.participants.length>2){
                    notification = new Notification(`${payload.new.nombreGrupo}`, {
                        body: `@${payload.new.messages.at(-1).at(0)}: ${payload.new.messages.at(-1).at(1)}`,
                        icon: "/chat.svg",
                        silent: false,
                        requireInteraction: false,
                        tag: "whatsapp-notification", // Same tag for replacement
                    });
                }
            }

            setActiveNotification(notification);

            setTimeout(() => {
                notification.close();
                if (activeNotification === notification) {
                    setActiveNotification(null);
                }
            }, duration);

            notification.onclick = () => {
                window.focus();
                notification.close();
                setActiveNotification(null);
            };
        } else {
            requestPermission();
        }
    };
    
    async function handleSendNotification(payload){
        if (Notification.permission !== "granted") {
            await requestPermission();
        }
        // Add a small delay if there's an active notification
        if (activeNotification) {
            setTimeout(() => {
                sendNotification(payload, 3000);
            }, 100);
        } else {
            sendNotification(payload, 3000);
        }
    };
    
    function subscribeToConversations() {
        let oldPayload 
        channel
        .on(
            "postgres_changes",
            { event: 'INSERT', schema: 'public', table: 'conversations',  },
            (payload) => {
                if(payload.new === oldPayload){
                    return
                }
                else if(payload.new.participants.includes(usuario)){
                    oldPayload = payload.new
                    setChats((prevChats) => [...prevChats, payload.new]);
                    if(payload.new.created_by !== usuario){
                        handleSendNotification(payload);
                    }
                }
            }
        )
        .on(
            "postgres_changes",
            { event: 'DELETE', schema: 'public', table: 'conversations' },
            (payload) => {
                
                if(selectedChat.id === payload.old.id){
                    setSelectedChat(null)
                }
                setChats((prevChats) => prevChats.filter((chat) => chat.id !== payload.old.id))
                // setSelectedChatMessages(null)
            }
        )
        .on(
            "postgres_changes",
            { event: 'UPDATE', schema: 'public', table: 'conversations' },
            (payload) => {
                if(payload.new.participants.includes(usuario)){
                    if(payload.new.messages.at(-1).at(0) !== usuario){
                        handleSendNotification(payload);
                    }
                    
                    setChats((prevChats) =>{
                        // const newText = document.getElementById(`last-message${payload.new.id}`)
                        // const newNumberText = document.getElementById(`num-messages${payload.new.id}`)
                        // const oldNumberText = parseInt(document.getElementById(`num-messages${payload.old.id}`).textContent)
                        return prevChats.map((chat) =>{
                            if(chat.id === payload.new.id) {
                                // newText.style.fontWeight = "bold"
                                // newNumberText.style.visibility = "visible"
                                // newNumberText.textContent = oldNumberText + 1
                                return { ...chat, messages: payload.new.messages }
                            }
                            return chat
                        })
                    })
                }
            }
        )
        .subscribe()
    }

    useEffect(() => {
        async function newChat() {
            setChats(await funcSelectChats(usuario))
            setLoading(false)
        }
        if(usuario){
            newChat()
        }
    },
    [])

    useEffect(()=>{
        if(usuario){
            subscribeToConversations()
        }
    }, [usuario])

    // Esta parte de código era para que salga cuantos mensajes nuevos hay, pero no estaba bien del todo, así que
    // lo he comentado por si en un futuro decido implementarlo correcatmente.

    // let oldId

    // useEffect(() => {
    //     if(selectedChat !== null){
    //         const newText = document.getElementById(`last-message${selectedChat.id}`)
    //         const newNumberText = document.getElementById(`num-messages${selectedChat.id}`)
    //         if(newText && newNumberText){
    //             newText.style.fontWeight = "normal"
    //             newNumberText.style.visibility = "hidden"
    //             newNumberText.textContent = 0
    //         }
    //     }
    // }, [selectedChat]);

    // useEffect(() => {
    //     if(selectedChat){
    //         if(oldId !== selectedChat.id){
    //             setOldId(selectedChat.id)
    //             const newText = document.getElementById(`last-message${selectedChat.id}`)
    //             const newNumberText = document.getElementById(`num-messages${selectedChat.id}`)
    //             newText.style.fontWeight = "normal"
    //             newNumberText.style.visibility = "hidden"
    //             newNumberText.textContent = 0
    //         }
    //     }
    // }, [selectedChatMessages])


    document.body.addEventListener("click", (e)=>{
        try{
            if(e.target.className !== "boton-nuevo"){
                const opciones = document.querySelector('.opciones')
                opciones.classList.add('oculto')
            }
        }catch {
            return
        }
    })

    if (loading) {
        return (
            <div className="chat-list">
                <div className="container">
                    <div className="cargando">
                        <div className="pelotas"></div>
                        <div className="pelotas"></div>
                        <div className="pelotas"></div>
                        <span className="texto-cargando">Cargando...</span>
                    </div>
                </div>
            </div>
        )
    } else if(chats){
        if(chats.length>0){
            return (
                <div className="chat-list">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            className="chat-item"
                            onClick={() => {
                                setSelectedChat(chat)
                                setSelectedChatMessages(chat)
                            }}
                        >
                            <div className="chat-container">
                                {chat.imagenGrupo!==undefined ? (<Avatar src={chat.imagenGrupo} alt={chat.name}/>) : (
                                <Avatar>{chat.participants.filter((p) => p !== usuario)[0].charAt(0).toUpperCase()}</Avatar>
                                )}

                                <div className="chat-info">
                                    <h4 id={chat.id} className="chat-name">{chat.participants.length===2?
                                    (chat.participants.filter((p) => p !== usuario)):
                                    chat.nombreGrupo}</h4>
                                    <div className="last-message-container">
                                        <p className="last-message" id={"last-message"+chat.id}>
                                            {chat.messages?
                                            JSON.parse(chat.messages.at(-1)).sender === usuario?
                                            `Tú: `+JSON.parse(chat.messages.at(-1)).text:
                                            chat.participants.length>2?
                                            `${JSON.parse(chat.messages.at(-1)).sender}: `+JSON.parse(chat.messages.at(-1)).text:
                                            JSON.parse(chat.messages.at(-1)).text:
                                            "Sin mensajes"}
                                        </p>
                                        {/* <div className="num-messages" id={"num-messages"+chat.id}>0</div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );    
        } else{
            return(
                <>
                    <div className="chat-list">
                        <h3>No tienes chats</h3>
                    </div>
                </>
            )
        }
    }
}

export default ChatList;
