import { useState } from "react"
import WhatsApp from './components/WhatsApp.jsx'
import Login from './components/Login.jsx'
import SignUp from "./components/signup.jsx"
import "./App.css"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

function App(){
    const [token, setToken] = useState(sessionStorage.getItem('access_token')==null?null:sessionStorage.getItem('access_token'))
    
    return(
        <>
            {token ? <WhatsApp /> : <Login setToken={setToken}/>}
            <SignUp/>
        </>
    )

}

export default App