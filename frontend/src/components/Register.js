import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate} from 'react-router-dom'; // Import Link from react-router-dom
import "./Register.css"; // Import the CSS file
import { useSnackbar } from 'notistack';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();


  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (firstName === '' || lastName === '' || userName === '' || password === '') {
      alert('Please enter all fields');
      return;
    }

    const data = {
      firstName,
      lastName,
      userName,
      password,
    };

    axios
      .post('https://algo-fluent-websitebackend.onrender.com/userlogin', data) // Correct endpoint
      .then(() => {
        enqueueSnackbar('Account Created successfully', { variant: 'success' });
        alert('Account Created successfully');
        navigate('/');

      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="register-main">
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-center">
            <h2>Sign Up</h2>
            <p>Create your account</p>
            <form>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="register-input"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="register-input"
              />
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="register-input"
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="register-input"
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className="password-icon" />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} className="password-icon" />
                )}
              </div>
              <div className="pass-input-div">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="register-input"
                />
                {showConfirmPassword ? (
                  <FaEyeSlash onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-icon" />
                ) : (
                  <FaEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-icon" />
                )}
              </div>
              <div className="register-center-buttons">
                <button type="button" onClick={handleRegister} className="register-button">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <p className="register-bottom-p">
            Already have an account? <a href="/login">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
