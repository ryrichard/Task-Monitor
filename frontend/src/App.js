import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import Register from "./components/Register";
import image from "./components/task.png";
//import Task from "./Task_Page/src/App";

function App() {
  // State variables
  const [viewLogin, setViewLogin] = useState(false);
  const [viewRegister, setViewRegister] = useState(false);
  //const [viewTask, setViewTask] = useState(false);

  // const handleTaskClick = () => {
  //   setViewTask(true);
  // };

  // // Function to handle canceling login
  // const handleTaskCancel = () => {
  //   setViewTask(false);
  // };
  // Function to handle login button click
  const handleLoginClick = () => {
    setViewLogin(true);
  };

  // Function to handle canceling login
  const handleLoginCancel = () => {
    setViewLogin(false);
  };

  // Function to handle register button click
  const handleRegisterClick = () => {
    setViewRegister(true);
  };

  // Function to handle canceling registration
  const handleRegisterCancel = () => {
    setViewRegister(false);
  };

  return (
    <main className="content p-3 mb-2 bg-info">
      <div className="title">
        <h2>Task Monitor</h2>
      </div>

      <div className="description">
        <h1>Organize your work and life</h1>
        <h5>Becomes focused and organized with Task Monitor</h5>
        <h5>A task manager you can trust for life</h5>
        <img src={image} alt="Your Description" className="image-small" />
      </div>

      {/* Button for login and register */}
      <div className="loginBtn">
        <div className="button">
          <button className="btn btn-primary" onClick={handleLoginClick}>
            Login
          </button>
          <button className="btn btn-primary" onClick={handleRegisterClick}>
            Register
          </button>
          {/* <button className="btn btn-primary" onClick={handleTaskClick}>
            trial
          </button> */}
        </div>
      </div>
      {/* Separate modal for login */}
      {viewLogin && (
        <div className="loginModal">
          <div className="modalContent">
            <span className="close" onClick={handleLoginCancel}>
              &times;
            </span>
            <Login onCancel={handleLoginCancel} />
          </div>
        </div>
      )}
      {/* Separate modal for registration */}
      {viewRegister && (
        <div className="register-modal">
          <div className="modal-content">
            <span className="close" onClick={handleRegisterCancel}>
              &times;
            </span>
            <Register onCancel={handleRegisterCancel} />
          </div>
        </div>
      )}
      {/* {viewTask && (
        <div className="loginModal">
          <div className="modalContent">
            <span className="close" onClick={handleTaskCancel}>
              &times;
            </span>
            <Task onCancel={handleTaskCancel} />
          </div>
        </div>
      )} */}
    </main>
  );
}

export default App;
