import React, { useState, useEffect } from 'react';

const TCPIPVisualizer = () => {
  const [currentLayer, setCurrentLayer] = useState(null);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [currentStage, setCurrentStage] = useState('');
  const layers = ['Application Layer', 'Transport Layer', 'Network Layer', 'Data Link Layer', 'Physical Layer'];

  useEffect(() => {
    // Automatically reset after each visualization
    if (currentLayer === layers.length) {
      setIsTransmitting(false);
    }
  }, [currentLayer]);

  const startTransmission = () => {
    if (isTransmitting) return;

    setIsTransmitting(true);
    setCurrentLayer(0);
    setCurrentStage('Message Encapsulation and Data Transmission Begins');

    const transmitStep = (layerIndex) => {
      if (layerIndex >= layers.length) return;

      setTimeout(() => {
        setCurrentLayer(layerIndex);
        setCurrentStage(`Passing through ${layers[layerIndex]}`);
        transmitStep(layerIndex + 1);
      }, 1500); // 1.5-second delay between layers
    };

    transmitStep(0);
  };

  const renderLayers = () => {
    return layers.map((layer, index) => (
      <div
        key={index}
        style={{
          ...styles.layerBox,
          backgroundColor:
            index === currentLayer
              ? 'yellow'
              : currentLayer > index
              ? '#28a745'
              : 'lightgray',
        }}
      >
        {layer}
      </div>
    ));
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.controlPanel}>
        <h1 style={styles.header}>TCP/IP Protocol Visualizer</h1>
        <div style={styles.controls}>
          <button onClick={startTransmission} style={styles.button} disabled={isTransmitting}>
            Start Transmission
          </button>
        </div>
      </div>

      <div style={styles.visualizationContainer}>
        {renderLayers()}
      </div>

      <div style={styles.infoPanel}>
        <h3 style={styles.infoHeader}>Current Stage:</h3>
        <p style={styles.currentStage}>{currentStage}</p>
        <h3 style={styles.infoHeader}>TCP/IP Stack Explanation:</h3>
        <ul style={styles.infoList}>
          <li>
            <strong>Application Layer:</strong> This is where the message originates. This layer handles protocols such as HTTP, FTP, SMTP, etc.
          </li>
          <li>
            <strong>Transport Layer:</strong> Responsible for splitting the message into smaller packets. TCP ensures reliable delivery by keeping track of each packet.
          </li>
          <li>
            <strong>Network Layer:</strong> Adds IP addresses to the packets and determines the best route for them to travel to the destination.
          </li>
          <li>
            <strong>Data Link Layer:</strong> This layer is responsible for sending the packets to the physical network, handling MAC addressing.
          </li>
          <li>
            <strong>Physical Layer:</strong> The actual transmission of the data happens here, as electrical signals, fiber optics, or wireless signals.
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
  layerBox: {
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

export default TCPIPVisualizer;
