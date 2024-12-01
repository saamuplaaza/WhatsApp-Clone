import { useState } from "react"
import WhatsApp from './components/WhatsApp.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/Signup.jsx'
import FormGrupo from './components/FormGrupo.jsx'
import FormNuevoContacto from './components/FormNuevoContacto.jsx'
import ModalEliminar from "./components/ModalEliminar.jsx"
import "./App.css"
import { createClient } from "@supabase/supabase-js"
import { Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

function App(){
    const [token, setToken] = useState(sessionStorage.getItem('access_token')==null?null:sessionStorage.getItem('access_token'))
    
    const [usuario, setUsuario] = useState('')

    // Estado para almacenar el chat seleccionado
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedChatMessages, setSelectedChatMessages] = useState(null);

    const [oldId, setOldId] = useState(0)


    useState(()=>{
    },[])
    
    return(
        <>
            <Routes>
                <Route path="/" element={!sessionStorage.getItem('access_token')?<Navigate to="/login"/>:<Navigate to="/home"/>} />
                <Route path="/home" element={<WhatsApp selectedChat={selectedChat} setSelectedChat={setSelectedChat} usuario={usuario} setUsuario={setUsuario} selectedChatMessages={selectedChatMessages} setSelectedChatMessages={setSelectedChatMessages} oldId={oldId} setOldId={setOldId}/>} />
                <Route path="/login" element={<Login token={token} setToken={setToken} usuario={usuario} setUsuario={setUsuario}/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/home/new-group" element={<FormGrupo usuario={usuario} />} />
                <Route path="/home/new-contact" element={<FormNuevoContacto usuario={usuario}/>} />
                <Route path="/home/delete-contact" element={<ModalEliminar selectedChat={selectedChat} setSelectedChat={setSelectedChat} />} />
                <Route path="*" element={<Navigate to="/"/>} />
            </Routes>
        </>
    )

}

export default App