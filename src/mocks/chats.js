import { createClient } from "@supabase/supabase-js"
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function funcSelectChats(usuario) {
    // const username = sessionStorage.getItem("username")
    // console.log(username)
    if (usuario) {
        // let user = userData[0].username
        let { data: conversations, error2 } = await supabase
            .from("conversations")
            .select("*")
            .contains("participants", [usuario])
        return conversations
    }
}
