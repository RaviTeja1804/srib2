import React, { useState } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });

      if (res.status !== 200 || res.data.msg !== "Login success") {
        console.error(res.data.msg);
        navigate("/");
      } else {
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || "Login failed");
      navigate("/");
    }
  };

  const signup = async () => {
    try {
      console.log("hello");
      const res = await axios.post("http://localhost:4000/signup", {
        username,
        password,
        fullname,
      });

      if (res.data?.msg === "User registered") {
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        alert(res.data.msg);
        console.log(res.data.msg);
      }
    } catch (err) {
      alert("Signup failed");
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          isLogin ? login() : signup();
        }}
      >
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
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

export default LoginSignup;
