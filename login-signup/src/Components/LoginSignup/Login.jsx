import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(
        "/login-signup/phppages/Login.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="submit" onClick={handleSubmit}>
          Login
        </div>

        <div className="new-account">
          Don’t have an account? <a href="/signup">Create one</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
