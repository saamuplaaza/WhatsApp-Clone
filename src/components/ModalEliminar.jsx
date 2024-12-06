import { supabase } from "../App.jsx"
import { useNavigate } from "react-router-dom"

function ModalEliminar({selectedChat, setSelectedChat, setSelectedChatMessages}){
    const navigate = useNavigate()

    function cerrarModal(){
        navigate('/home')
    }

    async function eliminarContacto(){
        const { error } = await supabase
            .from('conversations')
            .delete()
            .eq('id', selectedChat.id)
        setSelectedChat(null)
        setSelectedChatMessages(null)
        cerrarModal()
    }

    return (
        <div className="modal-eliminar">
            <button className="cerrar-modal" onClick={cerrarModal}>x</button>
            <div className="form-eliminar">
                <h1>¿Está seguro de que desea eliminar esta conversación?</h1>
                <div className="div-botones-form">
                    <button type="button" className="boton-crear" onClick={eliminarContacto}>Eliminar</button>
                    <button type="button" className="boton-cancelar" onClick={cerrarModal}>Cancelar</button>
                    
                </div>
            </div>
        </div>
    )
}

export default ModalEliminar