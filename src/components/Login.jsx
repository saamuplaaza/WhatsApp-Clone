// import { useEffect } from 'react'
import '../css/Login.css'
import { supabase } from "../App.jsx"

function Login({setToken}) {
    async function IniciarSesion(event){
        event.preventDefault()
        const email = document.querySelector('#email')
        const password = document.querySelector('#password')
            let { data, error } = await supabase.auth.signInWithPassword({
                email: email.value,
                password: password.value,
            })
            if(error){
                const incorrecto = document.querySelector('.incorrecto')
                const form = document.querySelector('#form_login')
                const p = document.createElement('div')
                p.classList.add('incorrecto')
                if(incorrecto){
                    form.removeChild(incorrecto)
                }
                p.innerHTML = "Usuario o contraseña incorrectos"
                form.insertBefore(p, email)
            }
            else{
                sessionStorage.setItem("access_token", data.session.access_token)
                sessionStorage.setItem("refresh_token", data.session.refresh_token)
				sessionStorage.setItem('user_id', data.session.user.id)

                setToken(data.session.access_token)
            }
            window.location.href = "index.html"
    }

    return (
        <>
            <h1>LOGIN</h1>
            <form method='POST' id='form_login' onSubmit={IniciarSesion}>
                <input type="email" name="email" id="email" placeholder='Email'/>
                <input  type="password" name="password" id="password" placeholder='Contraseña'/>
                <button type="submit" className='botonLogin'>Iniciar Sesión</button>
                <p>¿Aún no tienes una cuenta? <button type="button" className="botonRegistrar" onClick={()=>{
                        const signup = document.querySelector(".signUp")
                        signup.classList.toggle("oculto")
                }}>Regístrate</button></p>
            </form>
        </>
    )
}

export default Login
