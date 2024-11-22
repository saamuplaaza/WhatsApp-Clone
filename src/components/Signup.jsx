// import { createClient } from "@supabase/supabase-js"
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)
import "../css/SignUp.css"
import { supabase } from "../App"

function SignUp() {
    // console.log(supabase)

    // const boton = document.querySelector(".botonRegistro")
    // console.log(boton)

    async function handleClick() {
        const username = document.getElementById("username").value
        
        const email = document.getElementById("email-signup").value
        console.log(email)
        const password = document.getElementById("password-signup").value
        console.log(password)
        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

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
        <div className="signUp oculto">
            <h2>Sign Up</h2>
            <div id="form_registro">
                <input type="text" name="name" id="name" placeholder="Nombre"></input>
                <input type="text" name="lastName" id="lastName" placeholder="Apellidos"></input>
                <input type="text" name="username" id="username" placeholder="Nombre de Usuario" required></input>
                <input type="text" name="email" id="email-signup" placeholder="Email" required></input>
                <input type="password" name="password" id="password-signup" placeholder="Contraseña" required></input>
                <button type="button" className="botonRegistro" onClick={handleClick}>Registrarse</button>
                <a href="index.html">Volver al inicio</a>
            </div>
        </div>
        
    )
}

export default SignUp

// <!DOCTYPE html>
// <html lang="es">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
//     <link rel="stylesheet" href="./signUp.css">
//     <link rel="stylesheet" href="./css/WhatsApp.css">
// </head>

// <body>
//     <h2>Sign Up</h2>
//     <div id="form_registro">
//         <input type="text" name="name" id="name" placeholder="Nombre">
//         <input type="text" name="lastName" id="lastName" placeholder="Apellidos">
//         <input type="text" name="username" id="username" placeholder="Nombre de Usuario" required>
//         <input type="text" name="email" id="email" placeholder="Email" required>
//         <input type="password" name="password" id="password" placeholder="Contraseña" required>
//         <button type="button" class="botonRegistro">Registrarse</button>
//         <a href="index.html">Volver al inicio</a>
//     </div>
//     <script type="module" src="signUp.js"></script>
//     <!-- <script type="module" src="./src/main.jsx"></script> -->
// </body>

// </html>