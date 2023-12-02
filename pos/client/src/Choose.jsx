import React from 'react';
import './Choose.css';
import {Link} from 'react-router-dom';
const Choose=()=>{
    return(
        <div>
            <h1>Point of Sale Simulator</h1>
            <Link to="/Signup">
            <button>Login as Staff</button>
            </Link>
            <Link to="/AdminSignup">
            <button>Login as Admin</button>
            </Link>
        </div>
    );
};
export default Choose;