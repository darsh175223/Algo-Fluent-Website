import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import img1 from '.././pics/bronzeBadge.png';
import img2 from '.././pics/silverBadge.png';
import img3 from '.././pics/blank-gold-badge-label-2.png';
import img4 from '.././pics/Badge-Trophy-Diamond-icon.png';

const UserDashboard = () => {
  const location = useLocation();
  const [knowledgeLevel, setKnowledgeLevel] = useState(''); // State to store knowledge level

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
      <div style={{
        width: '1100px',
        height: '800px',
        backgroundColor: '#e3e2df',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px'
      }}>
        <h1 style={{ textAlign: 'center', marginTop: '20px', fontSize: '40px' }}>Schedule your Study Session</h1>
        
        {/* Knowledge Level Question */}
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <h2>Select your Knowledge Level:</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label style={{ fontSize: 'larger' }}>
              <input
                type="radio"
                value="Beginner"
                checked={knowledgeLevel === 'Beginner'}
                onChange={(e) => setKnowledgeLevel(e.target.value)}
              />
              Beginner
            </label>
            <label style={{ fontSize: 'larger', marginTop: '10px' }}>
              <input
                type="radio"
                value="Intermediate"
                checked={knowledgeLevel === 'Intermediate'}
                onChange={(e) => setKnowledgeLevel(e.target.value)}
              />
              Intermediate
            </label>
            <label style={{ fontSize: 'larger', marginTop: '10px' }}>
              <input
                type="radio"
                value="Expert"
                checked={knowledgeLevel === 'Expert'}
                onChange={(e) => setKnowledgeLevel(e.target.value)}
              />
              Expert
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Get Schedule</button>
        </div>
        
      </div>
    </div>
  );
};

export default UserDashboard;
