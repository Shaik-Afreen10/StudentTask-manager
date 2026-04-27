import React, { useState } from "react";
import axios from "axios";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    setPage("dashboard");
  };

  return (
    
    <div className="container">
<p onClick={() => setPage("register")} style={{ cursor: "pointer", color: "green" }}>
  Don't have an account? <b><u>Register</u></b>
</p>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;