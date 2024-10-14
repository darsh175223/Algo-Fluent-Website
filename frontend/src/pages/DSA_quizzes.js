import React, { useState, useEffect } from 'react';
import { useLocation, Link , useNavigate} from 'react-router-dom';
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
<h1>Additional Quizzes</h1>

<Link to="/Linked_List_Quiz" style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)', borderColor: 'black', border: '0px solid'}}>Linked List</Link>
<Link to="/BST_quiz" style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>BST</Link>
<Link to="/Hashmap_quiz" style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Hashmap</Link>
<Link to="/Closed_hashing_quiz" style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Closed Hashing</Link>
<Link to="/Selection_sort_quiz" style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Selection Sort</Link>
<Link to="/Merge_quiz" style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Merge Sort</Link>
<Link to="/Quick_sort_quiz" style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Quick Sort</Link>
<Link to="/RadixsortQuiz" style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Radix Sort</Link>
<Link to="/BubbleSortQuiz" style={{backgroundColor: '#6a0dad', color: 'white', padding: '15px 32px', margin: '10px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px'}}>Bubble Sort</Link>




</center>

       
      </div>
    </div>
  );
};

export default UserDashboard;