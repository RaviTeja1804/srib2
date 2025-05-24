import React, { useState } from 'react'
import './LoginSignup.css'
import { useNavigate } from "react-router-dom";

function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");

    const login = async () => {
        // try {
        //     const res = await axios.get("http://localhost:4000/login", {
        //         username,
        //         password
        //     });
        //     if (res.data?.error) {
        //         console.log(res.data.error);
        //         navigate("/");
        //     } else {
        //         navigate("/home");
        //     }
        // } catch (err) {
        //     navigate("/");
        // }
        navigate("/home")
    };

    const signup = async () => {
        // try {
        //     const res = await axios.get("http://localhost:4000/signup", {
        //         username,
        //         password,
        //         fullname
        //     });
        //     if (res.data?.error) {
        //         console.log(res.data.error);
        //         navigate("/");
        //     } else {
        //         navigate("/home");
        //     }
        // } catch (err) {
        //     navigate("/");
        // }
        navigate("/home")
    }

    return (
        <div className="auth-container">
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>

            <form>
                {!isLogin && <input type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} required />}
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit" onClick={() => isLogin ? login() : signup()}>{isLogin ? "Login" : "Sign Up"}</button>
            </form>

            <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Sign Up" : "Login"}
                </button>
            </p>
        </div>
    );
}

export default LoginSignup