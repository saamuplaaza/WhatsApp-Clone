import ChatList from "./ChatList";
import BotonNuevo from "./BotonNuevo";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */

function Sidebar({ setSelectedChat, setSelectedChatMessages, isOpen, onClose, chats, setChats, usuario }) {
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
        setSelectedChatMessages={(chat) => {
          setSelectedChatMessages(chat)
          onClose(); // Cerrar el sidebar al seleccionar un chat en pantallas pequeñas
        }}
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
