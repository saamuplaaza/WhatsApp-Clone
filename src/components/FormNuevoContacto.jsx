import "../css/BotonNuevo.css"
import { supabase } from "../App.jsx"
function FormNuevoContacto({usuario}) {
    function cerrarModal(){
        const modalGrupo = document.querySelector('.modal-contacto')
        modalGrupo.classList.toggle('oculto')
    }
    async function crearContacto(){
        const username = document.querySelector('#nombre-usuario').value 
        let datos = {
            participants: [usuario, username]
        }
        const { data, error } = await supabase
            .from('conversations')
            .insert([
                datos
            ])
            .select()
        cerrarModal()
    }
    return (
            <div className="modal-contacto oculto">
                <h1>Nuevo Contacto</h1>
                <button className="cerrar-modal" onClick={cerrarModal}>x</button>
                <div className="form-grupo">
                    <div>
                        <label htmlFor="">Nombre de usuario: </label>
                        <input type="text" name="nombre-usuario" id="nombre-usuario" placeholder="Nombre de usuario"/>
                    </div>
                    
                    <div className="div-botones-form">
                        <button type="button" className="boton-crear" onClick={crearContacto}>Crear</button>
                        <button type="button" className="boton-cancelar" onClick={cerrarModal}>Cancelar</button>
                    </div>
                </div>
            </div>
    );
}

export default FormNuevoContacto