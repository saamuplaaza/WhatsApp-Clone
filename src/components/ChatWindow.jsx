import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import ModalEliminar from "./ModalEliminar.jsx";
import { supabase } from "../App.jsx";
import "../css/ChatWindow.css"
import { useNavigate } from "react-router-dom";


function ChatWindow({ selectedChat, onSelectChat, chats, usuario }) {

  const navigate = useNavigate()

  function abrirModal(){
    navigate("/home/delete-contact")
    // const modalEliminar = document.querySelector('.modal-eliminar')
    // modalEliminar.classList.toggle('oculto')
  }

  // const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if(chats){
      if(chats.length > 0){
        if(selectedChat){
          let [chat] = chats.filter((c) => c.id === selectedChat.id)
          onSelectChat(chat)
        }}
    }
  }, [chats])

  useEffect(() => {
    const divMessages = document.querySelector(".messages")
    const input = document.getElementById("new-message")
      if(divMessages){  
      divMessages.scrollTop = divMessages.scrollHeight
    }
    if(input){
      input.focus()
    }
      
  }, [selectedChat])

  async function  handleSendMessage(event){
    event.preventDefault()
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
    return <div className="chat-window">
        <p className="no-chat-selected">
          Select a chat to start messaging
        </p>
      </div>;
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
              selectedChat.imagenGrupo!==null?selectedChat.imagenGrupo:""
            }></Avatar>
          )}

          <h3 className="header-nombre-usuario">{selectedChat.participants.length===2?
          (selectedChat.participants.filter((p) => p !== usuario)):
          selectedChat.nombreGrupo}</h3>
        </div>
        <MdDelete className="header-trash" onClick={abrirModal}/>
        {/* <ModalEliminar selectedChat={selectedChat}/> */}
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
      <form className="input-box" onSubmit={handleSendMessage}>
        <input
          id="new-message"
          type="text"
          placeholder="Escribe tu mensaje..."
        />
        <button type="submit" id="boton-submit">
          <Fab variant="extended" >
            <SendIcon sx={{ color: "#075e54" }} />
            Enviar
          </Fab>
        </button>
        <Fab variant="extended">
          <AttachFileIcon sx={{ color: "#075e54" }} />
        </Fab>
      </form>
    </div>
  );
}

export default ChatWindow;
