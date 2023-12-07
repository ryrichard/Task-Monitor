import React, { useState } from "react";
import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", { name, email, password, confirmPassword });
    // Perform validation checks
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Make an API request to your registration endpoint
      const response = await fetch("http://localhost:4000/user/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      // Check if the request was successful
      if (response.ok) {
        // Registration successful
        console.log("Registration successful!");
        alert("Registration successful!");
        setError("Go Back To Home and Login ");
      } else {
        // Handle registration error
        const data = await response.json();
        console.log(data);
        setError(data.message); // Assuming the server sends an error message
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during registration:", error);
      setError("Internal Server Error");
    }
  };

  return (
    <div className="register">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Retype your password"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="button">
          Register
        </button>
      </form>
    </div>
  );
}
