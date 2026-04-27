import React, { useState } from "react";
import axios from "axios";

function Register({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await axios.post("http://localhost:5000/register", {
      email,
      password,
    });

    alert("Registered!");
    setPage("login");
  };
  
  return (
   <div className="container">
        <p onClick={() => setPage("login")} style={{ cursor: "pointer", color: "green" }}>
  Already have an account? <b><u>Login</u></b>
</p>
      <h2>Register</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;