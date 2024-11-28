import "../css/SignUp.css"
import { supabase } from "../App"
import { Link } from "react-router-dom"

function SignUp() {

    async function handleClick(event) {
        event.preventDefault()
        const divForm = document.querySelector(".signUp")
        const username = document.querySelector("#username").value
        
        const email = document.querySelector("#email-signup").value
        const password = document.querySelector("#password-signup").value
        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        const divError = document.createElement('p')
        divError.className = "error"
        if (error) {
            if (error.message === "User already registered") {
                divError.textContent = "El usuario ya está registrado"
                divForm.appendChild(divError)
                return
            } else if (error.message === "Invalid login credentials") {
                divError.textContent = "Credenciales inválidas"
                divForm.appendChild(divError)
                return
            } else if (error.message === "Unable to validate email address: invalid format") {
                divError.textContent = "Formato de email inválido"
                divForm.appendChild(divError)
                return
            } else if (error.message == "Password should be at least 6 characters.") {
                divError.textContent = "La contraseña debe tener al menos 6 caracteres"
                divForm.appendChild(divError)
                return
            } else{
                divError.textContent = "Error al registrar el usuario. Por favor, inténtelo de nuevo más tarde"
                divForm.appendChild(divError)
                return
            }
        }

        const { data2, error2 } = await supabase
            .from("users")
            .insert([
                {
                    username: username,
                    password: password,
                    email: email,
                    user_id: data.user.id,
                    image: null,
                },
            ])
            .select()

        sessionStorage.setItem("access_token", data.session.access_token)
        sessionStorage.setItem("refresh_token", data.session.refresh_token)
        sessionStorage.setItem("user_id", data.session.user.id)

        document.location.href = "index.html"
    }

    return (
        <div className="signUp">
            <h2>Sign Up</h2>
            <form className="form_registro" onSubmit={handleClick}>
                <input type="text" name="name" id="name" placeholder="Nombre"></input>
                <input type="text" name="lastName" id="lastName" placeholder="Apellidos"></input>
                <input type="text" name="username" id="username" placeholder="Nombre de Usuario" required></input>
                <input type="text" name="email" id="email-signup" placeholder="Email" required></input>
                <input type="password" name="password" id="password-signup" placeholder="Contraseña" required></input>
                <button type="submit" className="botonRegistro">Registrarse</button>
            </form>
            <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
        </div>
        
    )
}

export default SignUp