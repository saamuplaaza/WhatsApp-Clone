import "../css/BotonNuevo.css"
import { supabase } from "../App";

const accessToken = sessionStorage.getItem('user_id')


function FormGrupo({usuario}) {
    // Falta añadir el grupo, solo está subir la imagen al storage de supabase
    function handleClick(){
        async function añadirImagen(){
            const inputElement = document.querySelector('#imagen-grupo');
            const file = inputElement.files[0]; // El archivo seleccionado
    
            const bucketName = 'groupImages'; // Cambia esto por el nombre de tu bucket
            const filePath = `${file.name}`; // Ruta dentro del bucket
    
            const img = document.querySelector('#imagen-grupo').value
            const nombreGrupo = document.querySelector('#nombre-grupo').value
            let usuarios = [usuario]
            const miembrosGrupo = document.querySelector('#miembros-grupo').value.split(',')
            miembrosGrupo.forEach(element => {
                usuarios.push(element)
            });

            const { data, error } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file);

                const { data2, error2 } = await supabase
                .from('conversations')
                // TODO: terminar de poner los grupos bien
                .insert([
                    {nombreGrupo: nombreGrupo, participants: usuarios, imagenGrupo: `https://cxttudnridlnxynfsdrb.supabase.co/storage/v1/object/public/groupImages/${file.name}` },
                ])
                .select()
        }
        añadirImagen()
        cerrarModal()
        
    }



    function cerrarModal(){
        const modalGrupo = document.querySelector('.modal-grupo')
        modalGrupo.classList.toggle('oculto')
    }
    return (
            <div className="modal-grupo oculto">
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

export default FormGrupo