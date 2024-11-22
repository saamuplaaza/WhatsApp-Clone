import "../css/BotonNuevo.css"
import FormGrupo from "./FormGrupo";
import FormNuevoContacto from "./FormNuevoContacto";

function BotonNuevo({usuario}) {
    function handleClick() {
        const opciones = document.querySelector('.opciones')
        opciones.classList.toggle('oculto')
    }

    function modalGrupo() {
        const divModal = document.querySelector('.modal-grupo')
        divModal.classList.toggle('oculto')
    }

    function modalContacto() {
        const divModal = document.querySelector('.modal-contacto')
        divModal.classList.toggle('oculto')
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
            <FormGrupo usuario={usuario}/>
            <FormNuevoContacto usuario={usuario}/>
        </>
    );
}

export default BotonNuevo