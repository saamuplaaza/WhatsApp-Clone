import { createClient } from "@supabase/supabase-js"
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const user_id = sessionStorage.getItem("user_id")
// console.log(user_id)
async function funcUser() {
    return { user: user, err: error }
}

export async function funcSelectChats() {
    let { data: userData, error } = await supabase
        .from("users")
        .select("username")
        .eq("user_id", user_id)
    let user = userData[0].username

    let { data: conversations, error2 } = await supabase
        .from("conversations")
        .select("*")
        .contains("participants", [user])
    return conversations
}
