import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const UserDashboard = () => {
  const location = useLocation();
  const [knowledgeLevel, setKnowledgeLevel] = useState('');
  const [topics, setTopics] = useState({ beginner: [], intermediate: [], expert: [] });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  
 


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
        minHeight: '800px',
        backgroundColor: '#e3e2df',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        padding: '20px'
      }}>

<center>
<h1>Additional Quizzes</h1>

<button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Linked List</button>
<button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>BST</button>
<button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Open Hashing</button>
<button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Closed Hashmap</button>
<button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Selection Sort</button>
<button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Merge Sort</button>
<button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Quick Sort</button>
<button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Radix Sort</button>
<button style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Bubble Sort</button>




</center>

       
      </div>
    </div>
  );
};

export default UserDashboard;