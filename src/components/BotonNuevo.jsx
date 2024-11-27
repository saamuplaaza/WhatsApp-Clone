import "../css/BotonNuevo.css"
import FormGrupo from "./FormGrupo";
import FormNuevoContacto from "./FormNuevoContacto";
import { useNavigate } from "react-router-dom";

function BotonNuevo() {
    const navigate = useNavigate()
    function handleClick() {
        const opciones = document.querySelector('.opciones')
        opciones.classList.toggle('oculto')
    }

    function modalGrupo() {
        navigate('/home/new-group')
    }

    function modalContacto() {
        navigate('/home/new-contact')
    }

    return (
        <>
            <div className="div-boton-nuevo">
                <button type="button" className="boton-nuevo" onClick={handleClick}>+</button>
                <div className="opciones oculto">
                    <button type="button" className="boton-grupo" onClick={modalGrupo}>Crear Grupo</button>
                    <button type="button"className="boton-contacto" onClick={modalContacto}>Añadir contacto</button>
                </div>
            </div>
        </>
    );
}

export default BotonNuevo