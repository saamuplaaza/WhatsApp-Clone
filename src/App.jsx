import { useState } from "react"
import WhatsApp from './components/WhatsApp.jsx'
import Login from './components/Login.jsx'
import "./App.css"

export function suma(a, b){
    return a + b
}

function App(){
    const [token, setToken] = useState(sessionStorage.getItem('access_token')==null?null:sessionStorage.getItem('access_token'))
    
    return(
        token ? <WhatsApp /> : <Login setToken={setToken}/>
    )

}

export default App