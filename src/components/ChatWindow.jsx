import { useState } from "react";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { MdDelete } from "react-icons/md";
import ModalEliminar from "./ModalEliminar.jsx";

/* eslint-disable react/prop-types */
// VARIABLES GLOBALES
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);
const apptitle = import.meta.env.VITE_TITLE;
import { supabase } from "./Login.jsx";


function ChatWindow({ selectedChat, onSelectChat, usuario, chats }) {

  function abrirModal(){
    const modalEliminar = document.querySelector('.modal-eliminar')
    modalEliminar.classList.toggle('oculto')
  }

  // const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if(chats.length > 0){
      if(selectedChat !== null){
        let [chat] = chats.filter((c) => c.id === selectedChat.id)
        onSelectChat(chat)
    }}
  }, [chats])

  useEffect(() => {
    const divMessages = document.querySelector(".messages")
      if(divMessages){  
      divMessages.scrollTop = divMessages.scrollHeight
    }
      
  }, [selectedChat])

  async function  handleSendMessage(){
    let newMessage = document.getElementById("new-message").value
    if(newMessage===""){
      return
    }
    let message = [usuario, newMessage]

    async function messageToChat() {
      const { data, error } = await supabase
      .from('conversations')
      .update(!selectedChat.messages?{messages: [message]}:{ messages: [...selectedChat.messages, message] })
      .eq('id', selectedChat.id)
      .select()
    }
    messageToChat()
    document.getElementById("new-message").value = ""
  };

  if (!selectedChat) {
    return <div className="chat-window">Select a chat to start messaging</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="header-usuario">
          {selectedChat.avatar ? (
            <Avatar src={selectedChat.avatar} alt={selectedChat.name} />
          ) : 
          (
            // <Avatar>{selectedChat.name.charAt(0).toUpperCase()}</Avatar>
            <Avatar src = {selectedChat.participants.length===2?
              (selectedChat.participants.filter((p) => p !== usuario)[0].charAt(0).toUpperCase()):
              // console.log(selectedChat.imagen)
              selectedChat.imagenGrupo!==null?selectedChat.imagenGrupo:""
            }></Avatar>
          )}

          <h3 className="header-nombre-usuario">{selectedChat.participants.length===2?
          (selectedChat.participants.filter((p) => p !== usuario)):
          selectedChat.nombreGrupo}</h3>
        </div>
        <MdDelete className="header-trash" onClick={abrirModal}/>
        <ModalEliminar selectedChat={selectedChat}/>

      </div>
      <div className="messages">
        {selectedChat.messages ?selectedChat.messages.map((message, i) => {
          return(
          <Message
            key={`${selectedChat.id}-${i}`}
            text={message.at(-1)}
            selectedChat={selectedChat}
            usuario={usuario}
            indice ={i}
            sender={message.at(0)}
          />
        )}): <p>No hay mensajes</p>}
      </div>
      <div className="input-box">
        <input
          id="new-message"
          type="text"
          placeholder="Escribe tu mensaje..."
        />
        <Fab variant="extended" onClick={handleSendMessage} >
          <SendIcon sx={{ color: "#075e54" }} />
          Enviar
        </Fab>
        <Fab variant="extended">
          <AttachFileIcon sx={{ color: "#075e54" }} />
        </Fab>
      </div>
    </div>
  );
}

export default ChatWindow;
