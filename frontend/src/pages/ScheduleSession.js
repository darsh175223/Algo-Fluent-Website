import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ScheduleSession = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [username] = useState(location.state?.username || '')
  const [logicLevel, setLogicLevel] = useState('')
  const [availability, setAvailability] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [finalTopics, setFinalTopics] = useState([])
  const [sessionCompleted, setSessionCompleted] = useState(false)

  const OFFICIAL_TOPICS = [
    "Python", "JavaScript (JS)", "HTML5", "CSS3", "C", "C#", "C++", "Java",
    "Docker", "Linked List", "BST (Binary Search Tree)", "Hashmap",
    "Closed Hashing", "Selection Sort", "Merge Sort", "Quick Sort",
    "Radix Sort", "Bubble Sort", "Stack", "Queue", "Binary Search",
    "Linear Search", "DFS (Depth-First Search)", "BFS (Breadth-First Search)",
    "Dijkstra", "TCP/IP", "HTTP Sim", "Routing Sim", "BGP"
  ]

  const LLM_API_URL = 'https://cloud-llm-309722609717.us-west1.run.app/chat'

  async function search(query) {
    const data = JSON.stringify({ q: query })
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://google.serper.dev/search',
      headers: {
        'X-API-KEY': process.env.REACT_APP_SERPER_API_KEY,
        'Content-Type': 'application/json'
      },
      data
    }
    try {
      const response = await axios.request(config)
      return response.data
    } catch (error) {
      console.error('Error during search:', error.response?.data || error.message)
      throw error
    }
  }

  function parse(data) {
    let paragraph = ''
    if (data.knowledgeGraph) {
      paragraph += `${data.knowledgeGraph.title}: ${data.knowledgeGraph.description}\n`
      for (const [key, value] of Object.entries(data.knowledgeGraph.attributes)) {
        paragraph += `${key}: ${value}\n`
      }
    }
    if (data.organic) {
      data.organic.forEach(item => {
        paragraph += `Title: ${item.title}\nSnippet: ${item.snippet}\n`
      })
    }
    if (data.peopleAlsoAsk) {
      data.peopleAlsoAsk.forEach(item => {
        paragraph += `Question: ${item.question}\nAnswer: ${item.snippet}\n`
      })
    }
    return paragraph
  }

  async function summarize(text) {
    const payload = {
      message: `
### GOAL

Your task is to analyze the provided text and identify exactly three topics that are most relevant to it.

### RULES

1. You MUST choose exactly three topics
2. You must NOT combine any of the items in the "OFFICIAL TOPIC LIST" into the choice of topic
3. Your choices MUST come exclusively from the official "Topic List" provided below
4. DO NOT invent, create, or include any topic that is not explicitly in the list
5. Your final output must be a single line in the format "TOPICS: Topic1, Topic2, Topic3"

### TEXT TO ANALYZE

---

${text}

---

### OFFICIAL TOPIC LIST

[
  "Docker",
  "Python",
  "Bubble Sort",
  "Stack",
  "Queue",
  "Binary Search",
  "Linear Search",
  "DFS (Depth-First Search)",
  "BFS (Breadth-First Search)",
  "Dijkstra",
  "Java",
  "Linked List",
  "JavaScript (JS)",
  "HTML5",
  "CSS3",
  "C",
  "C#",
  "C++",
  "BST (Binary Search Tree)",
  "Hashmap",
  "Closed Hashing",
  "Selection Sort",
  "Merge Sort",
  "Quick Sort",
  "Radix Sort",
  "TCP/IP",
  "HTTP Sim",
  "Routing Sim",
  "BGP"
]

### FINAL INSTRUCTION

Review the text and your analysis. Now, select exactly three topics from the "OFFICIAL TOPIC LIST" above. Format your response as requested.

Your output MUST be in the following format  
TOPICS: Topic1, Topic2, Topic3
      `,
      max_tokens: 150
    }

    try {
      const response = await axios.post(
        LLM_API_URL,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      )
      return response.data.response
    } catch (err) {
      console.error('summarize error', err.response?.data || err.message)
      throw err
    }
  }

  function extractTopicsFromResponse(response) {
    const match = response.match(/TOPICS:\s*(.*)/i)
    if (!match?.[1]) return []
    const cleaned = match[1].replace(/[.!?]+$/, '').trim()
    return cleaned.split(',')
      .map(t => t.trim().replace(/^["']|["']$/g, '').trim())
      .filter(t => t.length > 0)
      .slice(0, 3)
  }

  function validateTopics(topics) {
    if (topics.length !== 3) {
      console.log(`DEBUG: Expected exactly 3 topics, got ${topics.length}: [${topics.join(', ')}]`)
      return false
    }
    const invalid = topics.filter(topic =>
      !OFFICIAL_TOPICS.some(official => official.toLowerCase() === topic.toLowerCase())
    )
    if (invalid.length) {
      console.log(`DEBUG: Invalid topics not in list: [${invalid.join(', ')}]`)
      return false
    }
    return true
  }

  async function extractAndValidateTopics(paragraph, maxRetries = 55) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log(`\n--- Attempt ${attempt} ---`)
      const resp = await summarize(paragraph)
      console.log('LLM Response:', resp)
      const topics = extractTopicsFromResponse(resp)
      if (topics.length && validateTopics(topics)) {
        console.log('✅ Validation passed! Topics meet all requirements.')
        return topics
      }
      console.log('❌ Validation failed. Retrying...')
    }
    console.log(`❌ Failed after ${maxRetries} attempts.`)
    return null
  }

  const getTimeSlot = (availability) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    let startTime = new Date(tomorrow), endTime = new Date(tomorrow)
    if (availability === 'morning') {
      startTime.setHours(9, 0, 0, 0)
      endTime.setHours(10, 0, 0, 0)
    } else if (availability === 'afternoon') {
      startTime.setHours(14, 0, 0, 0)
      endTime.setHours(15, 0, 0, 0)
    } else if (availability === 'evening') {
      startTime.setHours(19, 0, 0, 0)
      endTime.setHours(20, 0, 0, 0)
    }
    return { startTime, endTime }
  }

  const generateGoogleCalendarUrl = (topic) => {
    const { startTime, endTime } = getTimeSlot(availability)
    const formatDate = (date) =>
      date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const title = `Study Session - ${topic}`
    const details = `Study session focused on ${topic}. Logic level: ${logicLevel}`
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${formatDate(startTime)}/${formatDate(endTime)}`,
      details,
      location: 'Online Study Session'
    })
    return `https://calendar.google.com/calendar/render?${params}`
  }

  const handleScheduleSession = async () => {
    if (!logicLevel || !availability) {
      alert('Please select both a logic level and availability before scheduling your session.')
      return
    }
    setIsLoading(true)
    setSessionCompleted(false)
    try {
      const searchQuery = `Computer Science topics, ${logicLevel}`
      const searchResult = await search(searchQuery)
      const paragraph = parse(searchResult)
      const topics = await extractAndValidateTopics(paragraph)
      if (topics) {
        setFinalTopics(topics)
        setSessionCompleted(true)
      } else {
        throw new Error('Failed to generate valid topics')
      }
    } catch (error) {
      console.error('Error in workflow:', error)
      alert('An error occurred while generating your study topics. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      backgroundImage: `url(${require('../pics/Gradient.png')})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <img
        src={require('../pics/goBacktoDashfromTradingSim.png')}
        alt="Go back"
        style={{
          position: 'absolute',
          top: '160px',
          right: '1450px',
          cursor: 'pointer',
          width: '50px',
          height: '50px'
        }}
        onClick={() => navigate('/userDashboard', { state: { username } })}
      />
      <div style={{
        width: '1100px',
        minHeight: '800px',
        backgroundColor: '#e3e2df',
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '40px'
        }}>
          Schedule your Study Session
        </h1>
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>Select Logic level</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <label style={{ marginRight: '20px' }}>
              <input type="radio" name="logicLevel" value="beginner" checked={logicLevel === 'beginner'} onChange={e => setLogicLevel(e.target.value)} />
              Beginner
            </label>
            <label style={{ marginRight: '20px' }}>
              <input type="radio" name="logicLevel" value="intermediate" checked={logicLevel === 'intermediate'} onChange={e => setLogicLevel(e.target.value)} />
              Intermediate
            </label>
            <label>
              <input type="radio" name="logicLevel" value="expert" checked={logicLevel === 'expert'} onChange={e => setLogicLevel(e.target.value)} />
              Expert
            </label>
          </div>
        </div>
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>Select availability</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <label style={{ marginRight: '20px' }}>
              <input type="radio" name="availability" value="morning" checked={availability === 'morning'} onChange={e => setAvailability(e.target.value)} />
              Morning
            </label>
            <label style={{ marginRight: '20px' }}>
              <input type="radio" name="availability" value="afternoon" checked={availability === 'afternoon'} onChange={e => setAvailability(e.target.value)} />
              Afternoon
            </label>
            <label>
              <input type="radio" name="availability" value="evening" checked={availability === 'evening'} onChange={e => setAvailability(e.target.value)} />
              Evening
            </label>
          </div>
        </div>
        <div style={{ marginTop: '40px' }}>
          <button
            style={{
              backgroundColor: 'green',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              opacity: isLoading ? 0.7 : 1
            }}
            onClick={handleScheduleSession}
            disabled={isLoading}
          >
            {isLoading ? 'Generating Topics...' : 'Schedule Session'}
          </button>
        </div>
        {isLoading && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <div style={{
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 2s linear infinite',
              margin: '0 auto'
            }} />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg) }
                100% { transform: rotate(360deg) }
              }
            `}</style>
            <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              Analyzing topics and generating your study session...
            </p>
          </div>
        )}
        {sessionCompleted && finalTopics.length > 0 && (
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '24px' }}>Your Study Topics:</h3>
            {finalTopics.map((topic, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
                padding: '10px',
                backgroundColor: '#f8f8f8',
                borderRadius: '5px',
                minWidth: '400px'
              }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{topic}</span>
                <button
                  style={{
                    backgroundColor: '#4285f4',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                  onClick={() => window.open(generateGoogleCalendarUrl(topic), '_blank')}
                >
                  Add to Calendar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ScheduleSession
