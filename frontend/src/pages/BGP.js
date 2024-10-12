import React, { useState, useEffect } from 'react';

const BGPSimulator = () => {
  const [currentStep, setCurrentStep] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStage, setCurrentStage] = useState('');

  // Steps in the BGP simulation process
  const steps = [
    'AS1: Sending BGP Route Advertisement to AS2',
    'AS2: Updating Routing Table with AS1’s Route',
    'AS2: Sending BGP Route Advertisement to AS3',
    'AS3: Receiving BGP Update from AS2',
    'AS3: Best Path Selection - Choosing AS2 as Next Hop',
    'AS3: Sending Route Advertisement to AS4',
    'AS4: Receiving Route and Updating Routing Table',
  ];

  useEffect(() => {
    if (currentStep === steps.length) {
      setIsSimulating(false);
    }
  }, [currentStep]);

  const startSimulation = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setCurrentStep(0);
    setCurrentStage('Starting BGP Routing Simulation...');

    const simulateStep = (stepIndex) => {
      if (stepIndex >= steps.length) return;

      setTimeout(() => {
        setCurrentStep(stepIndex);
        setCurrentStage(`Step: ${steps[stepIndex]}`);
        simulateStep(stepIndex + 1);
      }, 2000); // 2-second delay between steps
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
        <h1 style={styles.header}>BGP (Border Gateway Protocol) Simulator</h1>
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
        <h3 style={styles.infoHeader}>BGP Explanation:</h3>
        <ul style={styles.infoList}>
          <li>
            <strong>AS1: Sending BGP Route Advertisement to AS2:</strong> AS1 sends a BGP update to AS2, announcing a route it knows to a particular network.
          </li>
          <li>
            <strong>AS2: Updating Routing Table with AS1’s Route:</strong> AS2 updates its routing table to reflect the route it received from AS1.
          </li>
          <li>
            <strong>AS2: Sending BGP Route Advertisement to AS3:</strong> AS2 now propagates the route it received from AS1 to its neighbor AS3.
          </li>
          <li>
            <strong>AS3: Receiving BGP Update from AS2:</strong> AS3 receives a BGP update from AS2 and evaluates the route.
          </li>
          <li>
            <strong>AS3: Best Path Selection:</strong> AS3 selects the best path to the network based on factors such as AS-Path length, next-hop IP, and local preference.
          </li>
          <li>
            <strong>AS3: Sending Route Advertisement to AS4:</strong> After choosing the best path, AS3 advertises the route to AS4.
          </li>
          <li>
            <strong>AS4: Receiving Route and Updating Routing Table:</strong> AS4 receives the advertisement from AS3 and updates its routing table accordingly.
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
    width: '400px',
    height: '70px',
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

export default BGPSimulator;
