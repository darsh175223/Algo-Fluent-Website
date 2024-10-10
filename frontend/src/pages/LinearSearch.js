import React, { useState } from 'react';

const BarGraph = ({ array, currentIndex }) => {
  return (
    <div style={{ position: 'relative', height: '500px', width: '80%', margin: 'auto', top: '-280px' }}>
      {array.map((value, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            height: value * 2.5 + 'px',
            width: '20px',
            bottom: '0',
            left: `${50 + index * 25}px`,
            backgroundColor: index === currentIndex ? 'yellow' : 'lightgray',
            border: '1px solid black',
          }}
        ></div>
      ))}
    </div>
  );
};

const generateRandomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
};

const LinearSearchVisualizer = () => {
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState(generateRandomArray(10));
  const [target, setTarget] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [found, setFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleGenerate = () => {
    const newArray = generateRandomArray(arraySize); // Generate a new random array
    setArray(newArray); // Update the state with the new array
    setCurrentIndex(-1); // Reset the current index
    setFound(false); // Reset the found state
    setSearching(false); // Reset the searching state
  };

  const handleLinearSearch = () => {
    if (target === null || found) return;
    setSearching(true);
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < array.length) {
        setCurrentIndex(index);
        if (array[index] === target) {
          setFound(true);
          clearInterval(intervalId);
        }
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 500);
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.controlPanel}>
        <h1 style={styles.header}>Linear Search Visualizer</h1>
        <div style={styles.controls}>
          <label style={styles.label}>Array Size:</label>
          <input
            type="range"
            min="5"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            style={styles.rangeInput}
          />
          <button onClick={handleGenerate} style={styles.button}>
            Generate Array
          </button>
        </div>

        <div style={styles.controls}>
          <label style={styles.label}>Target Value:</label>
          <input
            type="number"
            onChange={(e) => setTarget(Number(e.target.value))}
            style={styles.inputField}
          />
          <button onClick={handleLinearSearch} style={styles.button}>
            Start Search
          </button>
        </div>

        {found && <p style={styles.successMessage}>Target {target} found at index {currentIndex}!</p>}
        {searching && !found && <p style={styles.searchingMessage}>Searching...</p>}
      </div>

      <BarGraph array={array} currentIndex={currentIndex} />

      <div style={styles.infoPanel}>
        <h3 style={styles.infoHeader}>How Linear Search Works:</h3>
        <p style={styles.infoText}>
          Linear Search is a simple algorithm that checks each element in the list sequentially until the target value is found or the list ends. 
          It is not as efficient as binary search but works on unsorted lists.
        </p>
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
    justifyContent: 'center',
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
  label: {
    fontSize: '16px',
    marginRight: '10px',
  },
  rangeInput: {
    marginRight: '15px',
  },
  inputField: {
    padding: '5px',
    marginRight: '10px',
    width: '80px',
    textAlign: 'center',
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
  successMessage: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  searchingMessage: {
    color: '#ffcc00',
  },
  infoPanel: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'left',
    maxWidth: '800px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginTop: '-270px',
  },
  infoHeader: {
    fontSize: '18px',
    borderBottom: '2px solid #333',
    paddingBottom: '10px',
  },
  infoText: {
    color: '#555',
    lineHeight: '1.6',
  },
};

export default LinearSearchVisualizer;
