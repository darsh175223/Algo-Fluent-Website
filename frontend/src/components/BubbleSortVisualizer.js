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
            // top: '100px',
          }}
        ></div>
      ))}
    </div>
  );
};

const generateRandomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
};

const BubbleSortVisualizer = () => {
  const [arraySize, setArraySize] = useState(20);
  const [array, setArray] = useState(generateRandomArray(20));

  const handleGenerate = () => {
    setArray(generateRandomArray(arraySize));
  };

  const handleSort = () => {
    let arrayCopy = [...array];
    let animations = [];

    const bubbleSort = (arr) => {
      let n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            animations.push([...arr]);
          }
        }
      }
    };

    bubbleSort(arrayCopy);

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
        <h1>Bubble Sort(see explanation below)</h1>
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

      <div className="bubble-sort-explanation" style={{ marginTop: 20, textAlign: 'left', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>What is Bubble Sort?</h3>
        <p>
          Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm gets its name from the way smaller elements "bubble" to the top of the list with each iteration.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>History and Creation:</h4>
        <p style={{ lineHeight: '1.6', color: '#444' }}>
          The exact origin of Bubble Sort is unclear, but it is believed to have been created in 1956. The algorithm is often attributed to computer scientists like E.J. Isaac and R.C. Singleton, who described it in their works. Despite its simplicity, Bubble Sort wasn't widely known until the 1960s when computing pioneer Donald Knuth included it in his seminal work "The Art of Computer Programming".
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Trivia:</h4>
        <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
          <li>Bubble Sort is also known as "sinking sort" due to the way larger elements "sink" to the bottom of the list.</li>
          <li>It has a time complexity of O(n²), making it impractical for large lists.</li>
          <li>Bubble Sort is often used as an educational tool to introduce the concept of sorting algorithms.</li>
          <li>A variant called "Cocktail Shaker Sort" traverses the list in both directions, which can be faster for some types of lists.</li>
        </ul>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Use Cases:</h4>
        <ol style={{ paddingLeft: '20px' }}>
          <li><strong>Educational purposes:</strong> To teach basic algorithm concepts and demonstrate algorithm efficiency.</li>
          <li><strong>Small datasets:</strong> Can be efficient for lists with very few elements.</li>
          <li><strong>Nearly sorted data:</strong> Performs reasonably well when the list is already almost sorted.</li>
          <li><strong>Embedded systems:</strong> In systems with limited memory, its simplicity can be an advantage.</li>
          <li><strong>Detecting sorted lists:</strong> Can be used to check if a list is already sorted with minimal extra code.</li>
        </ol>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Example Implementation:</h4>
        <pre style={{ backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px' }}>
          <code>
{`function bubbleSort(arr) {
  let n = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        // Swap elements
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
    n--;
  } while (swapped);
  return arr;
}`}
          </code>
        </pre>
        
        <p style={{ lineHeight: '1.6', color: '#444', marginTop: '15px' }}>
          While Bubble Sort is not efficient for large datasets, understanding its mechanism is crucial for grasping more complex sorting algorithms. Its simplicity makes it a great starting point for learning about algorithm analysis and optimization.
        </p>
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;
