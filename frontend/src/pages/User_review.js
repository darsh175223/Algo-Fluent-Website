import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const BST_Quiz = () => {
  const location = useLocation();
  const [knowledgeLevel, setKnowledgeLevel] = useState('');
  const [rating, setRating] = useState(0); // State to hold the rating value
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUserName] = useState(location.state?.username || ''); // Fallback to 'Guest'
  const navigate = useNavigate();

  
  const handleSubmit = () => {
    fetch('/api/update-review', { // Adjust the endpoint as needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'a', review: rating }), // Send default username and rating
    })
    .then(response => response.json())
    .then(data => {
      enqueueSnackbar('Review submitted successfully!', { variant: 'success' });
    })
    .catch(error => {
      enqueueSnackbar('Error submitting review.', { variant: 'error' });
    });
  };

  return (
    <div style={{
      backgroundImage: `url(${require('.././pics/Gradient.png')})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <img
          src={require('.././pics/goBacktoDashfromTradingSim.png')}
          alt="Go back to dashboard"
          style={{ position: 'absolute', top: '160px', right: '1450px', cursor: 'pointer', width: '50px', height: '50px' }}
          onClick={() => navigate('/userDashboard', { state: { username } })}
        />
      <div style={{
        width: '1100px',
        minHeight: '800px',
        backgroundColor: '#e3e2df',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        padding: '20px'
      }}>
        
        <center>
          <h1>User Reviews</h1>
          <label style={{ fontSize: '24px' }}>Rate this website out of 10:</label>
          <br />
          <input 
            type="range" 
            min="0" 
            max="10" 
            id="rating-input" 
            style={{ width: '300px', height: '20px' }} 
            onInput={(e) => setRating(e.target.value)} // Update rating state
          />
          <br />
          <label style={{ fontSize: '24px' }}>Your rating: <span id="rating">{rating}</span></label>
          <br />
          <br />
          <button onClick={handleSubmit} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', margin: '10px 0', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Submit</button>
        </center>
      </div>
    </div>
  );
};

export default BST_Quiz;