import ChatList from "./ChatList";
import BotonNuevo from "./BotonNuevo";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
// import Prueba from "./Prueba";

/* eslint-disable react/prop-types */

function Sidebar({selectedChat, setSelectedChat, selectedChatMessages , setSelectedChatMessages, isOpen, onClose, chats, setChats, usuario, setUsuario, oldId, setOldId }) {
  const navigate = useNavigate()
  function logout(){
    sessionStorage.clear()
    setSelectedChatMessages(null)
    navigate("/login")
  }
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>
          <img src="chat.svg" width={20} /> Mi Chat
        </h2>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <ChatList
        chats={chats}
        setChats={setChats}
        usuario={usuario}
        setUsuario={setUsuario}
        selectedChatMessages={selectedChatMessages}
        setSelectedChatMessages={(chat) => {
          setSelectedChatMessages(chat);
          onClose(); // Cerrar el sidebar al seleccionar un chat en pantallas pequeñas
        }}
        oldId={oldId}
        setOldId={setOldId}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
      <div className="footer-sidebar">
        <button className="boton-logout" onClick={logout}><CiLogout /> Cerrar Sesión</button>
        <BotonNuevo />
      </div>
    </div>
  );
}

export default Sidebar;
