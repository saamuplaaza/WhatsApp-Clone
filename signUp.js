import { createClient } from "@supabase/supabase-js"
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
// console.log(supabase)

const boton = document.querySelector(".botonRegistro")

boton.addEventListener("click", async () => {
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
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
})
