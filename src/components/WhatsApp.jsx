import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import "../css/WhatsApp.css";
import "../App.css"
import { useNavigate } from "react-router-dom";
import { supabase } from "../App";


function WhatsApp({ setSelectedChat, usuario, setUsuario, selectedChatMessages, setSelectedChatMessages }) {
  const user_id = sessionStorage.getItem("user_id")

  const navigate = useNavigate()
  useEffect(() => {
    !sessionStorage.getItem('access_token') ? navigate("/login") : null
  }, [])

  let [chats, setChats] = useState([])

  // Estado para controlar la visibilidad de la barra lateral, las variables booleanas suelen empezar por is
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Función para alternar la visibilidad de la barra lateral
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  useEffect(()=>{
    async function funcUser() {
        let { data: [users], error } = await supabase
        .from('users')
        .select("*")
        .eq("user_id", user_id)
        setUsuario(users.username)
    }
    if(!usuario){
        funcUser()
    }
  }, [])

  if(usuario){
    return (
      <>
        <div className="app">
          {/* Botón de menú para abrir/cerrar la lista de chats en pantallas pequeñas
          
          Renderizo condicional, solo sale el botón cuando no está visible la sidebar*/}
  
          {!isSidebarOpen && (
            <button className="menu-button" onClick={toggleSidebar}>
              Abrir Chats
            </button>
          )}
  
          
          <Sidebar
            chats={chats}
            setChats={setChats}
            usuario={usuario}
            setSelectedChatMessages={setSelectedChatMessages}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            setSelectedChat={setSelectedChat}
          />
  
          {/* Ventana de chat principal */}
          <ChatWindow 
            chats={chats}
            usuario={usuario}
            selectedChatMessages={selectedChatMessages} 
            setSelectedChatMessages={setSelectedChatMessages}
          />
        </div>
      </>
    );
  }

}

export default WhatsApp;
