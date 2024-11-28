import "../css/BotonNuevo.css"
import { supabase } from "../App";
import { useNavigate } from "react-router-dom";

const user_id = sessionStorage.getItem('user_id')

function FormGrupo({usuario}) {

    const navigate = useNavigate()

    async function handleClick() {
        try {
            let hour = new Date().getHours();
            let minutes = new Date().getMinutes();
            let seconds = new Date().getSeconds();
            let time = `${hour}:${minutes}:${seconds}`;
            const modalGrupo = document.querySelector('.form-grupo');
            const nombreGrupo = document.querySelector('#nombre-grupo').value;
            
            // Show loading state
            const loadingMessage = document.createElement('div');
            loadingMessage.classList.add('loading-message');
            loadingMessage.innerHTML = 'Creando grupo....<span>&#160</span>';
            modalGrupo.appendChild(loadingMessage);
    
            const inputElement = document.querySelector('#imagen-grupo');
            const file = inputElement.files[0];
    
            let usuarios = [usuario];
            const miembrosGrupo = document.querySelector('#miembros-grupo').value.split(',');
            usuarios.push(...miembrosGrupo);
    
            const bucketName = 'groupImages';
            const filePath = `${user_id}_${file.name}_${time}`;
    
            // Upload image
            const { data, error } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file);
    
            // Create group
            const { data2, error2 } = await supabase
                .from('conversations')
                .insert([{
                    nombreGrupo: nombreGrupo,
                    participants: usuarios,
                    created_by: usuario,
                    imagenGrupo: `https://cxttudnridlnxynfsdrb.supabase.co/storage/v1/object/public/groupImages/${user_id}_${file.name}_${time}`
                }])
                .select();
    
    
            // Show success notification
            loadingMessage.innerHTML = '¡Grupo creado correctamente!';
            
            setTimeout(() => {
                // Remove loading message
                loadingMessage.remove();
                
                // Navigate to home
                cerrarModal();
            }, 300);
        } catch (error) {
            console.error('Error:', error);
            loadingMessage.innerHTML = 'Algo ha salido mal, por favor intentelo de nuevo más tarde';
        }
    }

    function cerrarModal(){
        navigate('/home')
    }

    if(usuario){
        return (
                <div className="modal-grupo">
                    <h1>Crear Grupo</h1>
                    <button className="cerrar-modal" onClick={cerrarModal}>x</button>
                    <div className="form-grupo">
                        <div>
                            <label htmlFor="">Imagen del grupo:</label>
                            <input type="file" name="imagen-grupo" id="imagen-grupo" placeholder="Imagen del grupo"/>
                        </div>
                        <div>
                            <label htmlFor="">Nombre del grupo: </label>
                            <input type="text" name="nombre-grupo" id="nombre-grupo" placeholder="Nombre del grupo"/>
                        </div>
                        <div>
                            <label htmlFor="">Agregar miembros:</label>
                            <input type="text" name="miembros-grupo" id="miembros-grupo" placeholder="Agregar miembros" required/>
                        </div>
                        <div className="div-botones-form">
                            <button type="submit" className="boton-crear" onClick={handleClick}>Crear</button>
                            <button type="button" className="boton-cancelar" onClick={cerrarModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
        );
    }
}

export default FormGrupo