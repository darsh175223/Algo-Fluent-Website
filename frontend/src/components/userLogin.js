import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate} from 'react-router-dom'; // Import Link from react-router-dom
import "./userLogin.css"; // Import the CSS file
import { useSnackbar } from 'notistack';



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();



    const handleSaveBook = () => {
     
      if ( username === '' || password === '') {
        alert('Please enter all fields');
        return;
      }
  
      const data = {
        username,
        password
      };
      console.log('username: '+username+', password: '+password);
  
      axios
        .patch('https://algo-fluent-websitebackend.onrender.com/userlogin', data) // Correct endpoint
        .then(() => {
          enqueueSnackbar('logged in successfully', { variant: 'success' });
          navigate('/UserDashboard', { state: { username } });
  
  
        })
        .catch((error) => {
          enqueueSnackbar('Error', { variant: 'error' });
          console.log('Errrrrror: '+error);
        });
    };

  return (
    <div className="login-main">
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form>
              <input
                type="email"
                placeholder="Email"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="login-input"
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className="password-icon" />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} className="password-icon" />
                )}
              </div>
              <div className="login-center-options">
                <div className="remember-div">
                  
                </div>
                
              </div>
              <div className="login-center-buttons">
                <button type="button" onClick={handleSaveBook} className="login-button">
                  Log In
                </button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Don't have an account? <Link to="/Register">Sign Up</Link>
          </p>
        </div>
      </div>
  
    </div>
  );
};

export default Login;
