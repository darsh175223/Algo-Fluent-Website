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
  
  // New state to keep track of the last scheduled date
  const [lastScheduledDate, setLastScheduledDate] = useState(null);

  // New state for user input topic and its difficulty
  const [userTopic, setUserTopic] = useState('');
  const [topicDifficulty, setTopicDifficulty] = useState('');
  const [gaugingDifficulty, setGaugingDifficulty] = useState(false);

  const csTopics = [
    'Linked Lists', 'BST', 'HashMaps', 'Selection Sort', 'Quick Sort',
    'Merge Sort', 'Bubble Sort', 'Radix Sort'
  ];

  const fallbackClassification = {
    beginner: ['Linked Lists', 'BST', 'Selection Sort'],
    intermediate: ['BST', 'Quick Sort', 'Merge Sort'],
    expert: ['HashMaps', 'Bubble Sort', 'Radix Sort']
  };
  const API_KEY = "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";

  // Function to classify a topic using Hugging Face API
  const classifyTopic = async (topic) => {
    const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";

    console.log(`Classifying topic: ${topic}`);

    try {
      const response = await axios.post(
        API_URL,
        {
          inputs: topic,
          parameters: {
            candidate_labels: ["beginner", "intermediate", "expert"]
          }
        },
        {
          headers: { Authorization: `Bearer ${API_KEY}` }
        }
      );

      console.log(`Classification result for ${topic}:`, response.data.labels[0]);
      return response.data.labels[0];
    } catch (error) {
      console.error('Error classifying topic:', error);
      throw error;
    }
  };

  // Function to get topic recommendations
  const getTopicRecommendations = async () => {
    setLoading(true);
    console.log('Fetching topic recommendations...');
    
    let categorizedTopics = {
      beginner: [],
      intermediate: [],
      expert: []
    };

    try {
      for (const topic of csTopics) {
        console.log(`Classifying topic: ${topic}`);
        const category = await classifyTopic(topic);
        categorizedTopics[category].push(topic);
        console.log(`Topic ${topic} added to ${category} category`);
      }

      enqueueSnackbar('Topics categorized successfully!', { variant: 'success' });
    } catch (error) {
      console.error('Error fetching topic recommendations:', error);
      enqueueSnackbar('Failed to categorize topics. Using fallback classification.', { variant: 'warning' });
      categorizedTopics = fallbackClassification;
    } finally {
      setTopics(categorizedTopics);
      console.log('Categorized topics:', categorizedTopics);
      setLoading(false);
      console.log('Finished fetching topic recommendations.');
    }
  };

  useEffect(() => {
    if (knowledgeLevel) {
      getTopicRecommendations();
    }
  }, [knowledgeLevel]);

  const displayTopics = topics[knowledgeLevel.toLowerCase()] || [];

  // Function to create a Google Calendar event URL
  const createGoogleCalendarEventUrl = (topic, date) => {
    const eventTitle = encodeURIComponent(`Study ${topic} on AlgoFluent, Take quiz`);
    const eventDetails = encodeURIComponent(`Study session for ${topic}`);
    const eventDate = date.toISOString().replace(/-|:|\.\d\d\d/g,"");
    const endDate = new Date(date.getTime() + 20 * 60000);
    const eventEndDate = endDate.toISOString().replace(/-|:|\.\d\d\d/g,"");

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDetails}&dates=${eventDate}/${eventEndDate}`;
  };

  // Function to handle adding a topic to the study plan
  const handleAddToStudyPlan = (topic) => {
    console.log(`Adding ${topic} to study plan`);
    
    let nextStudyDate;
    if (lastScheduledDate) {
      nextStudyDate = new Date(lastScheduledDate);
      nextStudyDate.setDate(nextStudyDate.getDate() + 1);
    } else {
      nextStudyDate = new Date();
      nextStudyDate.setDate(nextStudyDate.getDate() + 1);
    }
    
    console.log(`Scheduled study date for ${topic}: ${nextStudyDate}`);
    
    const eventUrl = createGoogleCalendarEventUrl(topic, nextStudyDate);
    window.open(eventUrl, '_blank');
    
    setLastScheduledDate(nextStudyDate);
    
    enqueueSnackbar(`Added ${topic} to your study plan for ${nextStudyDate.toDateString()}`, { variant: 'success' });
  };

  // Function to gauge difficulty of a user-input topic
  const gaugeDifficulty = async () => {
    console.log(`Gauging difficulty for topic: ${userTopic}`);
    setGaugingDifficulty(true);

    const API_URL = "https://api-inference.huggingface.co/models/gpt2";
    const headers = {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    };

    const prompt = `Hi, I'm an expert in Computer Science topics and I can rank a computer science topic by the order of Very easy, easy, medium, hard, very hard. I would say the computer science topic of ${userTopic} is: `;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) {
        // Check if the response status indicates too many requests
        if (response.status === 429) {
          alert("Too many requests. Try again later."); // Alert for too many requests
        } else {
          throw new Error('Failed to gauge difficulty.'); // Throw error for other failures
        }
      }

      const data = await response.json();
      console.log('GPT-2 response:', data[0].generated_text);

      // Extract the first word of the response
      const difficulty = data[0].generated_text.split(' ')[0];
      console.log('Extracted difficulty:', difficulty);

      setTopicDifficulty(difficulty);
      enqueueSnackbar(`Difficulty of "${userTopic}" gauged successfully!`, { variant: 'success' });
    } catch (error) {
      console.error('Error gauging difficulty:', error);
      enqueueSnackbar('Failed to gauge difficulty. Please try again.', { variant: 'error' });
    } finally {
      setGaugingDifficulty(false);
    }
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
        <h1 style={{ textAlign: 'center', marginTop: '20px', fontSize: '40px' }}>Schedule your Study Session</h1>
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <h2>Select your Knowledge Level:</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {['Beginner', 'Intermediate', 'Expert'].map((level) => (
              <label key={level} style={{ fontSize: 'larger', marginTop: '10px' }}>
                <input
                  type="radio"
                  value={level}
                  checked={knowledgeLevel === level}
                  onChange={(e) => {
                    console.log(`Selected knowledge level: ${e.target.value}`);
                    setKnowledgeLevel(e.target.value);
                  }}
                />
                {level}
              </label>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <p>Loading topics...</p>
          </div>
        ) : knowledgeLevel && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ textTransform: 'capitalize' }}>{knowledgeLevel} Topics:</h3>
            <ul>
              {displayTopics.map((topic, index) => (
                <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                  {topic}
                  <button 
                    style={{ 
                      marginLeft: '20px',
                      backgroundColor: 'green', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '5px', 
                      padding: '5px 10px',
                      cursor: 'pointer' 
                    }}
                    onClick={() => handleAddToStudyPlan(topic)}
                  >
                    Add to Study Plan
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* New section for gauging topic difficulty */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <h3>Gauge Topic Difficulty</h3>
          <input
            type="text"
            value={userTopic}
            onChange={(e) => setUserTopic(e.target.value)}
            placeholder="Enter a CS topic"
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button
            onClick={gaugeDifficulty}
            disabled={gaugingDifficulty || !userTopic}
            style={{
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '5px 10px',
              cursor: 'pointer'
            }}
          >
            {gaugingDifficulty ? 'Gauging...' : 'Gauge Difficulty'}
          </button>
          {topicDifficulty && (
            <p style={{ marginTop: '10px' }}>
              The difficulty of "{userTopic}" is estimated to be: <strong>{topicDifficulty}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;