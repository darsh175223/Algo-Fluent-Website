import React, { useState, useEffect } from 'react';
import { useLocation, Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const UserDashboard = () => {
  const location = useLocation();

  const [knowledgeLevel, setKnowledgeLevel] = useState('');
  const [topics, setTopics] = useState({ beginner: [], intermediate: [], expert: [] });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUserName] = useState(location.state?.username || ''); // Fallback to 'Guest'


  const navigate = useNavigate();
  
 


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
<h1>Additional Simulations</h1>
<Link to="/Stack">
  <button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Stack</button>
</Link>
<Link to="/Queue">
  <button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Queue</button>
</Link>
<Link to="/binarySearch">
  <button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Binary Search</button>
</Link>
<Link to="/LinearSearch">
  <button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Linear Search</button>
</Link>
<Link to="/DFS">
  <button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>DFS</button>
</Link>

<Link to="/BFS">
  <button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>BFS</button>
</Link>

<Link to="/Dijestra">
  <button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Dijestra</button>
</Link>

<Link to="/TCP_IP">
  <button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>TCP/IP</button>
</Link>

<Link to="/HTTP_Sim">
  <button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>HTTP Sim</button>
</Link>
<Link to="/RoutingSim">
  <button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Routing Sim</button>
</Link>
<Link to="/BGP">
  <button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>BGP</button>
</Link>





</center>

       
      </div>
    </div>
  );
};

export default UserDashboard;