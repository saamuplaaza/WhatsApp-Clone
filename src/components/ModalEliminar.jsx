import { supabase } from "../App.jsx"

function ModalEliminar({selectedChat}){
    function cerrarModal(){
        const modalEliminar = document.querySelector('.modal-eliminar')
        modalEliminar.classList.toggle('oculto')
    }
    async function eliminarContacto(){
        const { error } = await supabase
            .from('conversations')
            .delete()
            .eq('id', selectedChat.id)
        cerrarModal()

    }

    return (
        <div className="modal-eliminar oculto">
            <button className="cerrar-modal" onClick={cerrarModal}>x</button>
            <div className="form-eliminar">
                <h1>¿Está seguro de que desea eliminar esta conversación?</h1>
                <div className="div-botones-form">
                    <button type="button" className="boton-crear" onClick={eliminarContacto}>Eliminar</button>
                    <button type="button" className="boton-cancelar" onClick={cerrarModal}>Cancelar</button>
                    
                </div>
            </div>
        </div>
            // <div className="modal-eliminar oculto">
            //     <h1>¿Está seguro de que desea eliminar esta conversación?</h1>
            //     <button className="cerrar-modal" onClick={cerrarModal}>x</button>
            //     <div className="div-botones-form">
            //         <button type="button" className="boton-crear" onClick={eliminarContacto}>Aceptar</button>
            //         <button type="button" className="boton-cancelar" onClick={cerrarModal}>Cancelar</button>
            //     </div>
            // </div>
    );
}

export default ModalEliminar