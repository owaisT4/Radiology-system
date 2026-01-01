import React, { useState } from 'react';
import './Signup.css';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(
        "/login-signup/phppages/signup.php",
        {
          method: "POST",
          body: formData
        }
      );

      const text = await response.text();
      setResult(text);
    } catch (err) {
      console.error(err);
      setResult("Fetch failed");
    }
  };

  return (
    <div>
      <div className="signup-container">
        <div className="signup-header">
          <div className="signup-title">Sign Up</div>
          <div className="signup-inputs">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className="signup-button" onClick={handleSubmit}>Sign Up</div>
          <div className="signup-link">
            Already have an account? <a href="/Login">Login</a>
          </div>
        </div>
      </div>

      {result && (
      <div className="signup-message">
    {result}
  </div>
)}
    </div>
  );
};

export default Signup;

