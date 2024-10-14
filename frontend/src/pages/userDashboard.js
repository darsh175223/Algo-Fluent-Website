import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import img1 from '.././pics/bronzeBadge.png';
import img2 from '.././pics/silverBadge.png';
import img3 from '.././pics/blank-gold-badge-label-2.png';
import img4 from '.././pics/Badge-Trophy-Diamond-icon.png';

const UserDashboard = () => {
  const location = useLocation();
  const [username, setUserName] = useState(location.state?.username || 'Guest'); // Fallback to 'Guest'
  const [userLevel, setUserLevel] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  // State for skills
  const [python, setPython] = useState(true);
  const [JavaScript, setJavaScript] = useState(false);
  const [HTML, setHTML] = useState(false);
  const [CSS, setCSS] = useState(false);
  const [C, setC] = useState(false);
  const [Csharp, setCsharp] = useState(false);
  const [Cplusplus, setCplusplus] = useState(false);
  const [Java, setJava] = useState(false);
  const [Docker, setDocker] = useState(false);
  const [masterBoolean, setMasterBoolean] = useState(false);

  // Fetch user data when username is set
  useEffect(() => {
    fetchData();
  }, [username]);

  const fetchData = () => {
    console.log("fetchData() called and the username is: ", username);

    const data = { username };
    console.log('data: ', data);

    axios
      .patch('https://algo-fluent-websitebackend.onrender.com/userlogin/66b003573647ff879e66f08e', data)
      .then((res) => {
        setUserLevel(res.data.level);
        console.log(res.data.level);
      });
  };

  const handleImageClick = (imageNum) => {
    console.log("handleImageClick called");

    const skillSetters = [
      setJavaScript,
      setHTML,
      setCSS,
      setC,
      setCsharp,
      setCplusplus,
      setJava,
      setDocker,
      setPython,
    ];

    const skillStates = [
      JavaScript,
      HTML,
      CSS,
      C,
      Csharp,
      Cplusplus,
      Java,
      Docker,
      python,
    ];

    if (imageNum >= 1 && imageNum <= 9) {
      setMasterBoolean(skillStates[imageNum - 1]);
      skillSetters[imageNum - 1](true);
    }

    if (!masterBoolean) {
      console.log("in masterBooleanLoop");

      const data = { username };
      console.log('data: ', data);

      axios
        .patch('https://algo-fluent-websitebackend.onrender.com/userupdate', data)
        .then((response2) => {
          setUserLevel(response2.data.level);
          console.log(response2.data.level);
        });
    }

    console.log("username is: " + username + ", user level is: " + userLevel);
  };

  const getBadgeImage = () => {
    if (userLevel >= 20) return img4;
    if (userLevel >= 14) return img3;
    if (userLevel >= 7) return img2;
    return img1;
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
      <div style={{
        width: '1100px',
        height: '800px',
        backgroundColor: '#e3e2df',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px'
      }}>
        <center>
          <h1 style={{ color: '#1f2833', margin: '30px 0 20px', fontSize: '50px' }}>Welcome, {username}!</h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px' }}>
          <img src={getBadgeImage()} alt="Badge" style={{ width: '100px', height: 'auto' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '500px', alignItems: 'center' }}>
            <progress value={userLevel * 5} max="100" style={{ width: '350px', height: '20px', color: 'green' }}></progress>
            <div style={{ width: '20px' }}></div>
            <Link to="/ScheduleSession" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '15px 15px', margin: '4px 2px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px' }} state={{ username }}>
              Schedule Study Sessions
            </Link>
            <Link to="/DSA_quizzes" style={{ backgroundColor: '#E0BBE4', color: 'black', padding: '15px 15px', margin: '4px 2px', cursor: 'pointer', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontSize: '16px' }} state={{ username }}>
              Additional Quizzes
            </Link>
          </div>
          </div>
         
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '1000px',
        height: '300px', marginTop: '50px'}}>
            <Link to="/pythonTutorial" onClick={() => handleImageClick(9)}>
              <img
                src={require('.././pics/Python-Logo.png')}
                alt="Python Tutorial"
                style={{
                  width: '100px',
                  height: 'auto',
                  borderRadius: '10px',
                  margin: '0 40px',
                }}
              />
            </Link>
            <Link to="/JavaScriptTutorial" onClick={() => handleImageClick(1)}>
              <img
                src={require('.././pics/JavaScript-logo.png')}
                alt="JavaScript Tutorial"
                style={{
                  width: '100px',
                  height: 'auto',
                  borderRadius: '10px',
                  margin: '0 40px',
                }}
              />
            </Link>
            <Link to="/HTMLTutorial" onClick={() => handleImageClick(2)}>
              <img
                src={require('.././pics/html5-logo-png-transparent.png')}
                alt="HTML Tutorial"
                style={{
                  width: '50px',
                  height: 'auto',
                  borderRadius: '10px',
                  margin: '0 40px',
                }}
              />
            </Link>
            <Link to="/CSSTutorial" onClick={() => handleImageClick(3)}>
              <img
                src={require('.././pics/css3-logo-png-transparent.png')}
                alt="CSS Tutorial"
                style={{
                  width: '100px',
                  height: 'auto',
                  borderRadius: '10px',
                  margin: '0 40px',
                }}
              />
            </Link>
            <Link to="/CTutorial" onClick={() => handleImageClick(4)}>
              <img
                src={require('.././pics/C_Logo.png')}
                alt="C Tutorial"
                style={{
                  width: '100px',
                  height: 'auto',
                  borderRadius: '10px',
                  margin: '0 40px',
                }}
              />
            </Link>
            <Link to="/CsharpTutorial" onClick={() => handleImageClick(5)}>
              <img
                src={require('.././pics/Logo_C_sharp.svg.png')}
                alt="C# Tutorial"
                style={{
                  width: '100px',
                  height: 'auto',
                  borderRadius: '10px',
                  margin: '0 40px',
                }}
              />
            </Link>
            <Link to="/Cplusplus_Tutorial" onClick={() => handleImageClick(6)}>
              <img
                src={require('.././pics/C++_logo.png')}
                alt="C++ Tutorial"
                style={{
                  width: '100px',
                  height: 'auto',
                  borderRadius: '10px',
                  margin: '0 40px',
                }}
              />
            </Link>
            <Link to="/JavaTutorial" onClick={() => handleImageClick(7)}>
              <img
                src={require('.././pics/java-4-logo-png-transparent.png')}
                alt="Java Tutorial"
                style={{
                  width: '60px',
                  height: 'auto',
                  borderRadius: '10px',
                  margin: '0 40px',
                }}
              />
            </Link>
            <Link to="/DockerTutorial" onClick={() => handleImageClick(8)}>
              <img
                src={require('.././pics/docker-logo-png-transparent.png')}
                alt="Docker Tutorial"
                style={{
                  width: '100px',
                  height: 'auto',
                  borderRadius: '10px',
                  margin: '0 40px',
                }}
              />
            </Link>
          </div>
          <div>
          <Link to="/user_review" style={{
            backgroundColor: 'yellow',
            color: 'black',
            padding: '25px 50px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            margin: '20px 0',
            fontSize: '24px',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
            textDecoration: 'none',
            position: 'absolute',
            top: '750px',
            left: '525px',
          }} state={{ username }}>
          Reviews
        </Link>
          <Link to="/More_simulations" style={{
            backgroundColor: 'black',
            color: 'yellow',
            padding: '25px 50px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            margin: '20px 0',
            fontSize: '24px',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
            textDecoration: 'none',
            position: 'absolute',
            top: '750px',
            left: '725px',
          }} state={{ username }}>
          More Visualizations
        </Link>

          </div>
        


        
        </center>
      </div>
    </div>
  );
};

export default UserDashboard;
