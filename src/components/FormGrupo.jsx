import "../css/BotonNuevo.css"
import { supabase } from "../App";
import { useNavigate } from "react-router-dom";

const accessToken = sessionStorage.getItem('user_id')

function FormGrupo({usuario}) {
    const navigate = useNavigate()
    // Falta añadir el grupo, solo está subir la imagen al storage de supabase
    function handleClick(){
        async function añadirImagen(){
            const inputElement = document.querySelector('#imagen-grupo');
            const file = inputElement.files[0];
            
            const bucketName = 'groupImages'; 
            const filePath = `${file.name}-${Date.now()}`;
    
            
            const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(filePath, file);
            
        }
        crearGrupo()
        añadirImagen()
        cerrarModal()
    }
    
    async function crearGrupo(){
        // const img = document.querySelector('#imagen-grupo').value
        const inputElement = document.querySelector('#imagen-grupo');
        const file = inputElement.files[0];

        const nombreGrupo = document.querySelector('#nombre-grupo').value

        let usuarios = [usuario]
        const miembrosGrupo = document.querySelector('#miembros-grupo').value.split(',')
        miembrosGrupo.forEach(element => {
            usuarios.push(element)
        });
        
        const { data2, error2 } = await supabase
        .from('conversations')
        .insert([
            {nombreGrupo: nombreGrupo, participants: usuarios, imagenGrupo: `https://cxttudnridlnxynfsdrb.supabase.co/storage/v1/object/public/groupImages/${file.name}` },
        ])
        .select()
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
                            <input type="text" name="miembros-grupo" id="miembros-grupo" placeholder="Agregar miembros"/>
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