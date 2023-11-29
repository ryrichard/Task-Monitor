import React from "react";
import './Register.css';

export default function Register() {
   return (
     <div className="register">
       <h1>Sign Up</h1>
       <form>
       <div className="form-group">
           <label className="form-label">Name</label>
           <input type="name" placeholder="Enter your full name" />
           </div>
           <div className="form-group">
           <label className="form-label">Email Address</label>
           <input type="email" placeholder="Enter your email" />
           </div>
           <div className="form-group">
           <label className="form-label">Password</label>
           <input type="password" placeholder="Enter your password" />
           </div>
           <div className="form-group">
           <label className="form-label">Confirm Password</label>
           <input type="password" placeholder="Retype your password" />
           </div>
           <button type='Submit' className='button'>
             Register
           </button>
         </form>
   </div>
   );
 }
