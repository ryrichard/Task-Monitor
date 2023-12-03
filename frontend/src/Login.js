import React, { useState } from "react";
import "./components/Login.css";
import App from "./Task_Page/src/App";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [viewTask, setViewTask] = useState(false);

  const handleTaskClick = () => {
    setViewTask(true);
  };

  // Function to handle canceling login
  const handleTaskCancel = () => {
    setViewTask(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("All fields are required");
      return;
    }
    try {
      // Make an API request to your login endpoint
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // Check if the request was successful
      if (response.ok) {
        // Parse the JSON response
        const data = await response.json();

        // Assuming the server sends a token upon successful login
        const token = data.token;

        // Store the token in your application state or local storage for future requests
        // You may also want to redirect the user to another page upon successful login
        console.log("Login successful!", token);
        setError(null);
        setUsername("");
        setPassword("");

        alert("Login successful");
        setViewTask(true);
      } else {
        // Handle authentication error
        const data = await response.json();
        setError(data.message); // Assuming the server sends an error message
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
      setError("Internal Server Error");
    }
  };

  return (
    <main>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
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

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>

      {viewTask && (
        <div className="loginModal">
          <div className="modalContent">
            <button className="logout" onClick={handleTaskCancel}>
              log out
            </button>
            <App onCancel={handleTaskCancel} />
          </div>
        </div>
      )}
    </main>
  );
}
