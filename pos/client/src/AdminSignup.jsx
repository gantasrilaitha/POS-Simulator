// src/Signup.js

import React,{ useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios'
import { Link } from "react-router-dom";
const AdminSignup = () => {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
      e.preventDefault()
      axios.post('https://pos-simulator-se-project-frontend.vercel.app/admindetail',{username,password})
      .then(result=>{console.log(result)
        if(result.data==="Success"){
        navigate('/AdminSuccess')
        }
      })
      .catch(err=>console.log(err))
    }

    return (
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
    );  
};

export default AdminSignup;



