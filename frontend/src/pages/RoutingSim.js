import React, { useState, useEffect } from 'react';

const SwitchingRoutingSimulator = () => {
  const [currentStep, setCurrentStep] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStage, setCurrentStage] = useState('');
  
  // Steps in the simulation process
  const steps = [
    'Switch: Receiving Frame with MAC Address',
    'Switch: Forwarding Frame to the Correct Port',
    'Router: Receiving Packet with IP Address',
    'Routing Protocol: RIP - Determining Path with Hop Count',
    'Routing Protocol: OSPF - Calculating Best Path using Link State',
    'Routing Protocol: EIGRP - Balancing between Distance Vector and Link State',
    'Router: Forwarding Packet to the Next Hop',
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
    setCurrentStage('Starting Switching & Routing Protocols Simulation...');

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
        <h1 style={styles.header}>Switching and Routing Protocols Simulator</h1>
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
        <h3 style={styles.infoHeader}>Switching and Routing Protocols Explanation:</h3>
        <ul style={styles.infoList}>
          <li>
            <strong>Switch: Receiving Frame with MAC Address:</strong> A switch receives a frame and looks at the destination MAC address to determine which port to forward the frame to.
          </li>
          <li>
            <strong>Switch: Forwarding Frame to the Correct Port:</strong> Using its MAC address table, the switch forwards the frame to the appropriate port.
          </li>
          <li>
            <strong>Router: Receiving Packet with IP Address:</strong> A router receives a packet and examines its destination IP address to determine where to forward it.
          </li>
          <li>
            <strong>Routing Protocol - RIP:</strong> The Routing Information Protocol (RIP) calculates the best path based on the number of hops between the source and destination. It uses a distance-vector algorithm.
          </li>
          <li>
            <strong>Routing Protocol - OSPF:</strong> The Open Shortest Path First (OSPF) protocol uses a link-state algorithm to calculate the shortest path based on the state of the network links.
          </li>
          <li>
            <strong>Routing Protocol - EIGRP:</strong> The Enhanced Interior Gateway Routing Protocol (EIGRP) combines both distance-vector and link-state properties to determine the most efficient path.
          </li>
          <li>
            <strong>Router: Forwarding Packet to the Next Hop:</strong> Based on the routing table and protocols used, the router forwards the packet to the next hop in the path to its destination.
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
    height: '90px',
    border: '1px solid black',
    borderRadius: '8px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    padding: '10px',
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

export default SwitchingRoutingSimulator;
