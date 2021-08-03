import "./auth.css"
import { useState } from "react";
import { loginRequest, registerRequest } from "../../api/AuthAPI"
import { showNotification } from "../Utilities/toast"
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { generateRandomUsername } from "../Utilities/auth-utilities";

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { setUser, setToken } = useAuth()
    const navigate = useNavigate()

    const submitButtonHandler = async () => {
        const { success, message, user, authToken } = await loginRequest(username, password);
        console.log(user)
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", JSON.stringify(authToken))
        setUser(user)
        setToken(authToken)
        showNotification(message)
        success && navigate("/todo")
    }

    const loginAsGuestHandler = async() => {
        const guestUsername = generateRandomUsername()
        console.log(guestUsername)
        const response = await registerRequest(guestUsername, guestUsername);
        const { success, message, user, authToken } = await loginRequest(guestUsername, guestUsername);
        console.log(user)
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", JSON.stringify(authToken))
        setUser(user)
        setToken(authToken)
        showNotification(message)
        success && navigate("/todo")
    }
    
    return(<>
        <div className="pageContainer mg-l-1">
            <h1> Login </h1>
            <div className="authContainer pd-1 mg-tb-2">
                <div className="inputContainer"> 
                    <span> Username </span> 
                    <input className="authInput" type="text" onChange={(e) => setUsername(e.target.value)} /> 
                </div>
                <div className="inputContainer"> 
                    <span> Password </span> 
                    <input className="authInput" type="password" onChange={(e) => setPassword(e.target.value)} /> 
                </div>
                <div className="w-100 flex flex-space-evenly">
                    <button className="submitButton" onClick={submitButtonHandler}> Submit </button> 
                    <button className="submitButton" onClick={() => loginAsGuestHandler()}> Login as Guest </button>
                </div>
                
            </div>
            <Link className="registerLink" to="/signup"> <span> Click here to Register </span> </Link>
            <div id="notification-container"></div>
        </div>
    </>)
}