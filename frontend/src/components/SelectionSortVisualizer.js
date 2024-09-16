import React, { useState } from 'react';

const BarGraph = ({ array }) => {
  return (
    <div className="bar-graph">
      {array.map((value, index) => (
        <div
          key={index}
          className="bar"
          style={{
            position: 'absolute',
            height: 4 * value + 'px',
            width: 1400 / array.length + 'px',
            bottom: '0px',
            left: 50 + (1400 / array.length) * index + 'px',
            backgroundColor: 'red',
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

const SelectionSortVisualizer = () => {
  const [arraySize, setArraySize] = useState(20);
  const [array, setArray] = useState(generateRandomArray(20));

  const handleGenerate = () => {
    setArray(generateRandomArray(arraySize));
  };

  const handleSort = () => {
    let arrayCopy = [...array];
    let animations = [];

    const selectionSort = (arr) => {
      const n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }
        if (minIdx !== i) {
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
          animations.push([...arr]);
        }
      }
    };

    selectionSort(arrayCopy);

    let index = 0;
    const intervalId = setInterval(() => {
      if (index < animations.length) {
        setArray(animations[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 7000 / animations.length);
  };

  return (
    <div>
      <center>
        <h1>Selection Sort (see explanation below)</h1>
        <div className="controls">
          <label>
            Array Size:
            <input
              type="range"
              min="20"
              max="1000"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
            />
          </label>
          <button onClick={handleGenerate}>Generate</button>
          <button onClick={handleSort}>Sort</button>
        </div>
      </center>
      <BarGraph array={array} />

      {/* Add a spacer div to create vertical space */}
      <div style={{ height: '450px' }}></div>

      <div className="selection-sort-explanation" style={{ marginTop: 20, textAlign: 'left', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>What is Selection Sort?</h3>
        <p>
          Selection Sort is a simple comparison-based sorting algorithm. It works by dividing the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire list. The algorithm repeatedly selects the smallest (or largest) element from the unsorted portion and moves it to the sorted portion.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>History and Creation:</h4>
        <p style={{ lineHeight: '1.6', color: '#444' }}>
          The exact origin of Selection Sort is not well-documented, but it's believed to have been developed in the early days of computer science, around the 1960s. Its simplicity made it one of the first sorting algorithms taught in computer science courses, despite its inefficiency for large datasets.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Trivia:</h4>
        <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
          <li>Selection Sort has a time complexity of O(n²), making it inefficient on large lists.</li>
          <li>It performs the same number of comparisons (n(n-1)/2) regardless of the initial order of the list, which can be an advantage in certain situations.</li>
          <li>Selection Sort makes the minimum possible number of swaps, n-1 in the worst case, which can be useful when memory write is a costly operation.</li>
          <li>It is not a stable sort, meaning it may change the relative order of equal elements.</li>
        </ul>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Use Cases:</h4>
        <ol style={{ paddingLeft: '20px' }}>
          <li><strong>Small datasets:</strong> Selection Sort can be efficient for sorting very small arrays or lists.</li>
          <li><strong>Memory-constrained systems:</strong> Its in-place nature (only requires O(1) additional memory space) makes it useful in memory-constrained environments.</li>
          <li><strong>Checking if a list is already sorted:</strong> Selection Sort can be used to verify if a list is sorted with minimal additional code.</li>
          <li><strong>Educational purposes:</strong> It's often used to introduce the concept of sorting algorithms due to its simplicity.</li>
          <li><strong>When write operations are expensive:</strong> In systems where writing to memory is significantly more expensive than reading, Selection Sort's minimal number of swaps can be advantageous.</li>
        </ol>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Example Implementation:</h4>
        <pre style={{ backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px' }}>
          <code>
{`function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`}
          </code>
        </pre>
        
        <p style={{ lineHeight: '1.6', color: '#444', marginTop: '15px' }}>
          While Selection Sort is not efficient for large datasets, understanding its mechanism is crucial for grasping more complex sorting algorithms. Its simplicity makes it a great starting point for learning about algorithm analysis and optimization techniques.
        </p>
      </div>
    </div>
  );
};

export default SelectionSortVisualizer;
