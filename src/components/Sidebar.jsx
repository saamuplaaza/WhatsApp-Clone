import ChatList from "./ChatList";
import BotonNuevo from "./BotonNuevo";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";

/* eslint-disable react/prop-types */

function Sidebar({ selectedChat ,onSelectChat, isOpen, onClose, usuario, setUsuario, chats, setChats }) {
  function logout(){
    sessionStorage.clear()
    window.location.href = "index.html"
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
        selectedChat={selectedChat}
        onSelectChat={(chat) => {
          onSelectChat(chat);
          onClose(); // Cerrar el sidebar al seleccionar un chat en pantallas pequeñas
        }}
      />
      <div className="footer-sidebar">
        <button className="boton-logout" onClick={logout}><CiLogout /> Cerrar Sesión</button>
        <BotonNuevo usuario={usuario}/>
      </div>
    </div>
  );
}

export default Sidebar;
