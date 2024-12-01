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
import { MdAttachFile } from "react-icons/md";


function ChatWindow({ selectedChatMessages, setSelectedChatMessages, chats, usuario }) {
  const user_id = sessionStorage.getItem('user_id')

  const navigate = useNavigate()

  function abrirModal(){
    navigate("/home/delete-contact")
    // const modalEliminar = document.querySelector('.modal-eliminar')
    // modalEliminar.classList.toggle('oculto')
  }


  useEffect(() => {
    if(chats){
      if(chats.length > 0){
        if(selectedChatMessages){
          let [chat] = chats.filter((c) => c.id === selectedChatMessages.id)
          setSelectedChatMessages(chat)
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
      
  }, [selectedChatMessages])

  async function  handleSendMessage(event){
    event.preventDefault()
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let time = `${hour}:${minutes}:${seconds}`;
    
    const newText = document.getElementById("new-message").value
    const newFile = document.getElementById("input-file").files[0]
    console.log(newFile)
    let url
    
    if(newText==="" && newFile === undefined){
      return
    }

    if (newFile){
      const bucketName = 'files';
      const filePath = `${user_id}_${newFile.name}_${time}`;
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, newFile, {contentType: newFile.type});
      console.log(data)
      console.log(error)
      url = `https://cxttudnridlnxynfsdrb.supabase.co/storage/v1/object/public/files/${filePath}`
    }

    let message = {
      text: newText,
      sender: usuario,
      time: time,
      file: url?url:null
    }
    // let message = [usuario, newMessage]
    message = JSON.stringify(message)

    async function messageToChat() {
      const { data, error } = await supabase
      .from('conversations')
      .update(!selectedChatMessages.messages?{messages: [message]}:{ messages: [...selectedChatMessages.messages, message] })
      .eq('id', selectedChatMessages.id)
      .select()
    }
    messageToChat()
    document.getElementById("new-message").value = ""
  };

  function handleSendFile(){
    
  }

  if (!selectedChatMessages) {
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
          {selectedChatMessages.avatar ? (
            <Avatar src={selectedChatMessages.avatar} alt={selectedChatMessages.name} />
          ) : 
          (
            // <Avatar>{selectedChatMessages.name.charAt(0).toUpperCase()}</Avatar>
            <Avatar src = {selectedChatMessages.participants.length===2?
              (selectedChatMessages.participants.filter((p) => p !== usuario)[0].charAt(0).toUpperCase()):
              selectedChatMessages.imagenGrupo!==null?selectedChatMessages.imagenGrupo:""
            }></Avatar>
          )}

          <h3 className="header-nombre-usuario">{selectedChatMessages.participants.length===2?
          (selectedChatMessages.participants.filter((p) => p !== usuario)):
          selectedChatMessages.nombreGrupo}</h3>
        </div>
        <MdDelete className="header-trash" onClick={abrirModal}/>
      </div>
      <div className="messages">
        {selectedChatMessages.messages ?selectedChatMessages.messages.map((message, i) => {
          return(
          <Message
            key={`${selectedChatMessages.id}-${i}`}
            text={JSON.parse(message).text}
            file={JSON.parse(message).file}
            selectedChatMessages={selectedChatMessages}
            usuario={usuario}
            indice ={i}
            sender={JSON.parse(message).sender}
          />
        )}): <p>No hay mensajes</p>}
      </div>
      <form className="input-box" onSubmit={handleSendMessage}>
        <label id="send-file" htmlFor="input-file">
          <MdAttachFile/>
        </label>
        <input type="file" id="input-file" className="oculto"/>
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
      </form>
    </div>
  );
}

export default ChatWindow;
