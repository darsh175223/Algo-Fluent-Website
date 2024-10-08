import React, { useState, useEffect } from 'react';

const HTTPRequestResponseSimulator = () => {
  const [currentStep, setCurrentStep] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStage, setCurrentStage] = useState('');
  const steps = [
    'DNS Lookup',
    'TCP Connection Establishment',
    'Sending HTTP Request',
    'Processing Request at Server',
    'Receiving HTTP Response',
  ];

  useEffect(() => {
    // Automatically reset after simulation completes
    if (currentStep === steps.length) {
      setIsSimulating(false);
    }
  }, [currentStep]);

  const startSimulation = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setCurrentStep(0);
    setCurrentStage('Starting HTTP Request-Response Simulation...');

    const simulateStep = (stepIndex) => {
      if (stepIndex >= steps.length) return;

      setTimeout(() => {
        setCurrentStep(stepIndex);
        setCurrentStage(`Step: ${steps[stepIndex]}`);
        simulateStep(stepIndex + 1);
      }, 1500); // 1.5-second delay between steps
    };

    simulateStep(0);
  };

  const renderSteps = () => {
    return steps.map((step, index) => (
      <div
        key={index}
        style={{
          ...styles.stepBox,
          backgroundColor:
            index === currentStep
              ? 'yellow'
              : currentStep > index
              ? '#28a745'
              : 'lightgray',
        }}
      >
        {step}
      </div>
    ));
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.controlPanel}>
        <h1 style={styles.header}>HTTP Request/Response Simulator</h1>
        <div style={styles.controls}>
          <button onClick={startSimulation} style={styles.button} disabled={isSimulating}>
            Start Simulation
          </button>
        </div>
      </div>

      <div style={styles.visualizationContainer}>
        {renderSteps()}
      </div>

      <div style={styles.infoPanel}>
        <h3 style={styles.infoHeader}>Current Stage:</h3>
        <p style={styles.currentStage}>{currentStage}</p>
        <h3 style={styles.infoHeader}>HTTP Request/Response Cycle Explanation:</h3>
        <ul style={styles.infoList}>
          <li>
            <strong>DNS Lookup:</strong> The browser performs a DNS (Domain Name System) lookup to resolve the domain name (e.g., www.example.com) to an IP address.
          </li>
          <li>
            <strong>TCP Connection Establishment:</strong> The browser initiates a TCP connection to the server using a three-way handshake to establish a reliable connection.
          </li>
          <li>
            <strong>Sending HTTP Request:</strong> Once the connection is established, the browser sends the HTTP request, typically including the URL, method (GET, POST), headers, and possibly body data.
          </li>
          <li>
            <strong>Processing Request at Server:</strong> The server processes the request, which may involve querying a database, executing business logic, and preparing the response.
          </li>
          <li>
            <strong>Receiving HTTP Response:</strong> The server sends back the HTTP response, which includes a status code (e.g., 200 OK), headers, and the requested content (e.g., HTML, JSON).
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    backgroundImage: `url(${require('.././pics/Gradient.png')})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  controlPanel: {
    backgroundColor: '#e3e2df',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '30px',
    width: '90%',
    maxWidth: '800px',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  header: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  controls: {
    marginBottom: '15px',
  },
  button: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    marginLeft: '10px',
  },
  visualizationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '30px',
  },
  stepBox: {
    width: '300px',
    height: '60px',
    border: '1px solid black',
    borderRadius: '8px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
  },
  infoPanel: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'left',
    maxWidth: '800px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  infoHeader: {
    fontSize: '18px',
    borderBottom: '2px solid #333',
    paddingBottom: '10px',
  },
  infoList: {
    color: '#555',
    lineHeight: '1.6',
  },
  currentStage: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '20px',
  },
};

export default HTTPRequestResponseSimulator;
