import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Apple from './pages/Apple';
import Apricot from './pages/Apricot';
import Ball from './pages/Ball';
import Banana from './pages/Banana';
import Hashtable from './pages/Hashtable';
import Hashmap from './pages/Hashmap';
import MergeSort from './pages/MergeSort';
import BubbleSort from './pages/BubbleSort';
import RadixSort from './pages/RadixSort';
import LinearRegression from './pages/LinearRegressionPage';
import NeuralNetworkPage from './pages/NeuralNetworkPage';
import DigitPage from './pages/DigitPage';
import LogisticRegression from './pages/LogisticRegressionPage';
import Login from './pages/loginPage';
import Register from './components/Register';
import Pong from './pages/PongAI';
import UserDashboard from './pages/userDashboard';
import PythonTutorial from './pages/PythonTutorial';
import JavaScriptTutorial from './pages/JavaScriptTutorial';
import HTMLTutorial from './pages/HTML_Tutorial';
import CSSTutorial from './pages/CSSTutorial';
import CTutorial from './pages/C_Tutorial';
import CsharpTutorial from './pages/CsharpTutorial';
import Cplusplus_Tutorial from './pages/Cplusplus_Tutorial';
import JavaTutorial from './pages/JavaTutorial';
import DockerTutorial from './pages/DockerTutorial';
import ScheduleSession from './pages/ScheduleSession';
import DSA_quizzes from './pages/DSA_quizzes';
import Linked_List_Quiz from './pages/Linked_List_Quiz';
import BST_quiz from './pages/BST_quiz';







function App() {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openML, setOpenML] = useState(false);
  const [openGames, setOpenGames] = useState(false);


  const menuRefA = useRef();
  const menuRefB = useRef();
  const menuRefML = useRef();
  const menuRefGames = useRef();

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/Login');
  };


  useEffect(() => {
    const handler = (e) => {
      if (menuRefA.current && !menuRefA.current.contains(e.target)) {
        setOpenA(false);
      }
      if (menuRefB.current && !menuRefB.current.contains(e.target)) {
        setOpenB(false);
      }
      if (menuRefML.current && !menuRefML.current.contains(e.target)) {
        setOpenML(false);
      }
      if (menuRefGames.current && !menuRefGames.current.contains(e.target)) {
        setOpenGames(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div className="App">
      <div className="header-container">
        <header className="header">
          <Link to="/" className="title">AlgoFluent</Link>
          <nav className="nav">
            <div className="nav-item" ref={menuRefA}>
              <a onClick={() => setOpenA(!openA)}>Data Structure Visualizer</a>
              <div className={`dropdown-menu ${openA ? 'active' : 'inactive'}`}>
                <ul>
                  <DropdownItem text="Linked List" link="/apple" />
                  <DropdownItem text="Binary Tree" link="/apricot" />
                  <DropdownItem text="Closed Hashing" link="/Hashtable" />
                  <DropdownItem text="Open Hashing" link="/Hashmap" />
                </ul>
              </div>
            </div>

            <div className="nav-item" ref={menuRefB}>
              <a onClick={() => setOpenB(!openB)}>Sorting Algorithms</a>
              <div className={`dropdown-menu ${openB ? 'active' : 'inactive'}`}>
                <ul>
                  <DropdownItem text="Selection Sort" link="/ball" />
                  <DropdownItem text="Quick Sort" link="/banana" />
                  <DropdownItem text="Merge Sort" link="/MergeSort" />
                  <DropdownItem text="Bubble Sort" link="/BubbleSort" />
                  <DropdownItem text="Radix Sort" link="/RadixSort" />
                </ul>
              </div>
            </div>

            <div className="nav-item" ref={menuRefML}>
              <a onClick={() => setOpenML(!openML)}>Machine Learning Visualizer</a>
              <div className={`dropdown-menu ${openML ? 'active' : 'inactive'}`}>
                <ul>
                  <DropdownItem text="Linear Regression" link="/LinearRegression" />
                  <DropdownItem text="Polynomial Regression" link="/LogisticRegression" />
                  <DropdownItem text="Neural Network" link="/NeuralNetworkPage" />

                </ul>
              </div>
            </div>

            <div className="nav-item" ref={menuRefGames}>
              <a onClick={() => setOpenGames(!openGames)}>Games</a>
              <div className={`dropdown-menu ${openGames ? 'active' : 'inactive'}`}>
                <ul>
                  <DropdownItem text="Digits game" link="/DigitPage" />


                </ul>
              </div>
            </div>

            <button onClick={handleLoginClick}
            style={{
              backgroundColor: '#2d5f5d',
              borderColor: 'white',
              color: 'white',
              fontSize: '15px',
              padding: '10px 10px',
              borderRadius: '40px',
              cursor: 'pointer'
            }}
            >Login</button>


          </nav>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apple" element={<Apple />} />
        <Route path="/apricot" element={<Apricot />} />
        <Route path="/ball" element={<Ball />} />
        <Route path="/banana" element={<Banana />} />
        <Route path="/Hashtable" element={<Hashtable />} />
        <Route path="/Hashmap" element={<Hashmap />} />
        <Route path="/MergeSort" element={<MergeSort />} />
        <Route path="/BubbleSort" element={<BubbleSort />} />
        <Route path="/RadixSort" element={<RadixSort />} />
        <Route path="/LinearRegression" element={<LinearRegression />} />
        <Route path="/NeuralNetworkPage" element={<NeuralNetworkPage />} />
        <Route path="/DigitPage" element={<DigitPage />} />
        <Route path="/LogisticRegression" element={<LogisticRegression />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Pong" element={<Pong />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/PythonTutorial" element={<PythonTutorial />} />
        <Route path="/JavaScriptTutorial" element={<JavaScriptTutorial />} />
        <Route path="/HTMLTutorial" element={<HTMLTutorial />} />
        <Route path="/CSSTutorial" element={<CSSTutorial />} />
        <Route path="/CTutorial" element={<CTutorial />} />
        <Route path="/CsharpTutorial" element={<CsharpTutorial />} />
        <Route path="/Cplusplus_Tutorial" element={<Cplusplus_Tutorial />} />
        <Route path="/JavaTutorial" element={<JavaTutorial />} />
        <Route path="/DockerTutorial" element={<DockerTutorial />} />
        <Route path="/ScheduleSession" element={<ScheduleSession />} />
        <Route path="/DSA_quizzes" element={<DSA_quizzes />} />
        <Route path="/Linked_List_Quiz" element={<Linked_List_Quiz />} />
        <Route path="/BST_quiz" element={<BST_quiz />} />



      </Routes>
    </div>
  );
}

function DropdownItem({ text, link }) {
  return (
    <li className="dropdownItem">
      <Link to={link}>{text}</Link>
    </li>
  );
}

export default App;
