import React, { useState, useEffect } from 'react';

const BarGraph = ({ array, left, right, mid }) => {
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
            backgroundColor: index === mid ? 'yellow' : index >= left && index <= right ? 'lightblue' : 'lightgray',
            border: '1px solid black',
          }}
        ></div>
      ))}
    </div>
  );
};

const generateRandomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1).sort((a, b) => a - b);
};

const BinarySearchVisualizer = () => {
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState(generateRandomArray(10));
  const [target, setTarget] = useState(null);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(array.length - 1);
  const [mid, setMid] = useState(null);
  const [found, setFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleGenerate = () => {
    setArray(generateRandomArray(arraySize));
    setLeft(0);
    setRight(arraySize - 1);
    setFound(false);
    setSearching(false);
    setMid(null);
  };

  const handleBinarySearch = () => {
    if (target === null || found) return;
    setSearching(true);
    let l = 0;
    let r = array.length - 1;
    const intervalId = setInterval(() => {
      if (l <= r) {
        const m = Math.floor((l + r) / 2);
        setMid(m);
        if (array[m] === target) {
          setFound(true);
          clearInterval(intervalId);
        } else if (array[m] < target) {
          l = m + 1;
        } else {
          r = m - 1;
        }
        setLeft(l);
        setRight(r);
      } else {
        clearInterval(intervalId);
      }
    }, 500);
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.controlPanel}>
        <h1 style={styles.header}>Binary Search Visualizer</h1>
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
          <button onClick={handleBinarySearch} style={styles.button}>
            Start Search
          </button>
        </div>

        {found && <p style={styles.successMessage}>Target {target} found at index {mid}!</p>}
        {searching && !found && <p style={styles.searchingMessage}>Searching...</p>}
      </div>

      <BarGraph array={array} left={left} right={right} mid={mid} />

      <div style={styles.infoPanel}>
        <h3 style={styles.infoHeader}>How Binary Search Works:</h3>
        <p style={styles.infoText}>
          Binary Search is an efficient algorithm for finding an item from a sorted list of items. It repeatedly divides
          in half the portion of the list that could contain the item, until narrowing down the possible locations to
          just one. The algorithm works by comparing the target value to the middle element of the list. If the target
          is equal to the middle element, the search ends. If the target is smaller, the search continues in the lower
          half; if larger, the search continues in the upper half.
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

export default BinarySearchVisualizer;
