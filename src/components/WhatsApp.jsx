import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import "../css/WhatsApp.css";
import "../App.css"
import { Notifications } from 'react-push-notification';
import Prueba from "./Prueba";


function WhatsApp() {
  let [chats, setChats] = useState([])
  let [usuario, setUsuario] = useState('')

  // Estado para almacenar el chat seleccionado
  const [selectedChat, setSelectedChat] = useState(null);
  // Estado para controlar la visibilidad de la barra lateral, las variables booleanas suelen empezar por is
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Función para alternar la visibilidad de la barra lateral
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <>
      {/* // Top of DOM tree
        <Notifications />
        <div className="row">
          <div className="content">
            Hello world.
          </div>
        </div>
      <Prueba/> */}
      <div className="app">
        {/* Botón de menú para abrir/cerrar la lista de chats en pantallas pequeñas
        
        Renderizo condicional, solo sale el botón cuando no está visible la sidebar*/}

        {!isSidebarOpen && (
          <button className="menu-button" onClick={toggleSidebar}>
            Abrir Chats
          </button>
        )}

        
        {/* La barra lateral se muestra o se oculta según el estado `isSidebarOpen` 
        Parametros:
        - onSelectChat funcion callback en este caso cambio el estado de selectedChat
        - isOpen: booleano para saber si la barra está abierta, paso el estado isSidebarOpen
        - onClose: funcion callback para cambiar el estado del padre osea App al cerrar el sidebar
        */}
        <Sidebar
          chats={chats}
          setChats={setChats}
          usuario={usuario}
          setUsuario={setUsuario}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Ventana de chat principal */}
        <ChatWindow 
          chats={chats}
          // setChats={setChats}
          usuario={usuario}
          setUsuario={setUsuario}
          selectedChat={selectedChat} 
          onSelectChat={setSelectedChat}
        />
      </div>
    </>
  );
}

export default WhatsApp;
