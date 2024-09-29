import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Closed_Hashing_Quiz = () => {
  const location = useLocation();
  const [knowledgeLevel, setKnowledgeLevel] = useState('');
  const [topics, setTopics] = useState({ beginner: [], intermediate: [], expert: [] });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  
  // State to hold selected answers
  const [selectedAnswers, setSelectedAnswers] = useState({
    question1: '',
    question2: '',
    question3: ''
  });

  // State to track if the quiz has been submitted
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0); // State to hold the score

  const handleAnswerChange = (question, value) => {
    setSelectedAnswers(prev => ({ ...prev, [question]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true); // Mark the quiz as submitted

    let calculatedScore = 0;
    const answers = {
      question1: { correct: 'B', text: 'What is a common collision resolution technique in closed hashing?' },
      question2: { correct: 'A', text: 'What is the main advantage of closed hashing?' },
      question3: { correct: 'C', text: 'Which of the following is a disadvantage of closed hashing?' },
    };

    for (const [key, value] of Object.entries(answers)) {
      if (selectedAnswers[key] === value.correct) {
        calculatedScore++;
      }
    }

    setScore(calculatedScore); // Update the score state
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
        minHeight: '800px',
        backgroundColor: '#e3e2df',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        padding: '20px'
      }}>
        <center>
            <h1>Closed Hashing Quiz</h1>
          <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontWeight: 'bold' }}>Question 1: What is a common collision resolution technique in closed hashing?</p>
                {['A', 'B', 'C', 'D'].map(option => (
                  <label key={option} style={{ display: 'block', marginBottom: '10px', color: 
                    submitted ? (selectedAnswers.question1 === option && option !== 'B' ? 'red' : 
                    (option === 'B' ? 'green' : 'black')) : 'black', fontWeight: submitted ? 'bold' : 'normal' }}>
                    <input 
                      type="radio" 
                      name="question1" 
                      value={option} 
                      style={{ marginRight: '10px' }} 
                      onChange={() => handleAnswerChange('question1', option)} 
                    />
                    {option}) {option === 'A' ? 'Chaining' : 
                     option === 'B' ? 'Open addressing' : 
                     option === 'C' ? 'Linear probing' : 
                     'Quadratic probing'}
                  </label>
                ))} 
              </div>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontWeight: 'bold' }}>Question 2: What is the main advantage of closed hashing?</p>
                {['A', 'B', 'C', 'D'].map(option => (
                  <label key={option} style={{ display: 'block', marginBottom: '10px', color: 
                    submitted ? (selectedAnswers.question2 === option && option !== 'A' ? 'red' : 
                    (option === 'A' ? 'green' : 'black')) : 'black', fontWeight: submitted ? 'bold' : 'normal' }}>
                    <input 
                      type="radio" 
                      name="question2" 
                      value={option} 
                      style={{ marginRight: '10px' }} 
                      onChange={() => handleAnswerChange('question2', option)} 
                    />
                    {option}) {option === 'A' ? 'Better space utilization' : 
                     option === 'B' ? 'Faster access time' : 
                     option === 'C' ? 'Easier implementation' : 
                     'Less memory overhead'}
                  </label>
                ))} 
              </div>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontWeight: 'bold' }}>Question 3: Which of the following is a disadvantage of closed hashing?</p>
                {['A', 'B', 'C', 'D'].map(option => (
                  <label key={option} style={{ display: 'block', marginBottom: '10px', color: 
                    submitted ? (selectedAnswers.question3 === option && option !== 'C' ? 'red' : 
                    (option === 'C' ? 'green' : 'black')) : 'black', fontWeight: submitted ? 'bold' : 'normal' }}>
                    <input 
                      type="radio" 
                      name="question3" 
                      value={option} 
                      style={{ marginRight: '10px' }} 
                      onChange={() => handleAnswerChange('question3', option)} 
                    />
                    {option}) {option === 'A' ? 'Increased complexity' : 
                     option === 'B' ? 'Higher memory usage' : 
                     option === 'C' ? 'Potential clustering' : 
                     'Slower search times'}
                  </label>
                ))} 
              </div>
              <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
              {submitted && (
                <div style={{ marginTop: '20px', fontSize: '35px', fontWeight: 'bold' }}>
                  Your score: {score}/3
                </div>
              )}
              <div id="resultContainer" style={{ marginTop: '20px' }}></div>
            </form>
          </div>
        </center>
      </div>
    </div>
  );
};

export default Closed_Hashing_Quiz;
