import React from "react";
import { useState } from "react";
import "./Register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // need to connect to DB
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="register">
        <h1>Sign Up</h1>
        <form>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="name"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Retype your password"
            />
          </div>
          <button type="Submit" className="button">
            Register
          </button>
        </form>
      </div>
    </form>
  );
}
