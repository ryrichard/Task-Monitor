import React from "react";
import './Login.css';


export default function Login() {
  return (
    <div className="login">
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input type="email" placeholder="Enter your email" />
        </div>
      
        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>

        <button type='Submit' className='button'>
          Submit
        </button>
      </form>
    </div>
  );
}

