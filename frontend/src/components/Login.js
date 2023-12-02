import React from "react";
import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // need to connect to DB
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="login">
        <h1>Login</h1>
        <form>
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

          <button type="Submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </form>
  );
}
