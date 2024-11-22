import ChatList from "./ChatList";
import BotonNuevo from "./BotonNuevo";
import { useEffect, useState } from "react";
/* eslint-disable react/prop-types */

function Sidebar({ selectedChat ,onSelectChat, isOpen, onClose, usuario, setUsuario, chats, setChats }) {
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
      <BotonNuevo usuario={usuario}/>
    </div>
  );
}

export default Sidebar;
