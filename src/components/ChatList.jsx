import "../css/ChatList.css";
// import chats from "../mocks/dataChats.json";
import { funcSelectChats } from "../mocks/chats.js";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { supabase } from "./Login.jsx";

const user_id = sessionStorage.getItem("user_id")
/* mapea los chats que está en los mocks/chats.js y los muestra en la lista de chats  
debes pensar donde hacer el fetch, si pasarlo como props... pero no lo dejes como variable global
*/
/* eslint-disable react/prop-types */
function ChatList({ selectedChat, onSelectChat, chats, setChats, usuario, setUsuario }) {
    // const [usuario, setUsuario] = useState('')
    const channel = supabase.channel('conversations');
    const [loading, setLoading] = useState(true);
    
    function subscribeToConversations() {
        channel
        .on(
            "postgres_changes",
            { event: 'INSERT', schema: 'public', table: 'conversations',  },
            (payload) => {
                if(payload.new.participants.includes(usuario)){
                    setChats((prevChats) => [...prevChats, payload.new]);
                }
            }
        )
        .on(
            "postgres_changes",
            { event: 'DELETE', schema: 'public', table: 'conversations' },
            (payload) => {
                    setChats((prevChats) => prevChats.filter((chat) => chat.id !== payload.old.id))
            }
        )
        .on(
            "postgres_changes",
            { event: 'UPDATE', schema: 'public', table: 'conversations' },
            (payload) => {
                // console.log(payload.new)
                setChats((prevChats) =>{
                    const newText = document.getElementById(`last-message${payload.new.id}`)
                    const newNumberText = document.getElementById(`num-messages${payload.new.id}`)
                    const oldNumberText = parseInt(document.getElementById(`num-messages${payload.old.id}`).textContent)
                    return prevChats.map((chat) =>{
                        // console.log(chat)
                        if(chat.id === payload.new.id) {
                            newText.style.fontWeight = "bold"
                            newNumberText.style.visibility = "visible"
                            newNumberText.textContent = oldNumberText + 1
                            return { ...chat, messages: payload.new.messages }
                        }
                        return chat
                    })
                })
            }
        )
        .subscribe()
    }

    useEffect(() => {
        async function newChat() {
            setChats(await funcSelectChats())
            setLoading(false)
        }
        newChat()
    },
    []);
    
    useEffect(()=>{
        async function funcUser() {
            let { data: [users], error } = await supabase
            .from('users')
            .select("*")
            .eq("user_id", user_id)
            // usuario = users.username
            setUsuario(users.username)
            // console.log(usuario)
        }
        funcUser()
    },
    [])

    useEffect(()=>{
        if(usuario){
            subscribeToConversations()
        }
    }, [usuario])


    useEffect(() => {
        if(selectedChat){
            
            const newText = document.getElementById(`last-message${selectedChat.id}`)
            const newNumberText = document.getElementById(`num-messages${selectedChat.id}`)
            newText.style.fontWeight = "normal"
            newNumberText.style.visibility = "hidden"
            newNumberText.textContent = 0
        }
    }, [selectedChat]);

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
    } else if(chats.length>0){
        return (
        // console.log(chats),
            <div className="chat-list">
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className="chat-item"
                        onClick={() => onSelectChat(chat)}
                    >
                        <div className="chat-container">
                            {chat.imagenGrupo!==undefined ? (<Avatar src={chat.imagenGrupo} alt={chat.name}/>) : (
                            <Avatar>{chat.participants.filter((p) => p !== usuario)[0].charAt(0).toUpperCase()}</Avatar>
                            )}

                            <div className="chat-info">
                                <h4 id={chat.id} className="chat-name">{chat.participants.length===2?
                                (chat.participants.filter((p) => p !== usuario)):
                                chat.nombreGrupo}</h4>
                                {/* {console.log(chat.messages.at(-1).at(-1))} */}
                                <div className="last-message-container">
                                    <p className="last-message" id={"last-message"+chat.id}>
                                        {chat.messages?
                                        chat.messages.at(-1).at(0) === usuario?
                                        `Tú: `+chat.messages.at(-1).at(-1):
                                        chat.participants.length>2?
                                        `${chat.messages.at(-1).at(0)}: `+chat.messages.at(-1).at(-1):
                                        chat.messages.at(-1).at(-1):
                                        "Sin mensajes"}
                                    </p>
                                    <div className="num-messages" id={"num-messages"+chat.id}>0</div>
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
                <h1>Mis Chats</h1>
                <div className="chat-list">
                    <h3>No tienes chats</h3>
                </div>

            </>
        )
    }
}

export default ChatList;
