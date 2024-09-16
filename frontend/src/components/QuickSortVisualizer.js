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

const QuickSortVisualizer = () => {
  const [arraySize, setArraySize] = useState(20);
  const [array, setArray] = useState(generateRandomArray(20));

  const handleGenerate = () => {
    setArray(generateRandomArray(arraySize));
  };

  const handleSort = () => {
    let arrayCopy = [...array];
    let animations = [];

    const quickSort = (arr, low, high) => {
      if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
      }
    };

    const partition = (arr, low, high) => {
      let pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          animations.push([...arr]);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      animations.push([...arr]);
      return i + 1;
    };

    quickSort(arrayCopy, 0, arrayCopy.length - 1);

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
        <h1>Quick Sort (see explanation below)</h1>
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

      <div className="quick-sort-explanation" style={{ marginTop: 20, textAlign: 'left', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>What is Quick Sort?</h3>
        <p>
          Quick Sort is an efficient, in-place sorting algorithm that uses a divide-and-conquer strategy. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>History and Creation:</h4>
        <p style={{ lineHeight: '1.6', color: '#444' }}>
          Quick Sort was developed by British computer scientist Tony Hoare in 1959 while he was a visiting student at Moscow State University. He developed it as a way to sort words for an English-Russian dictionary he was creating. The algorithm was published in 1961 and has since become one of the most widely used sorting algorithms.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Trivia:</h4>
        <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
          <li>Quick Sort has an average time complexity of O(n log n), making it one of the fastest sorting algorithms in practice.</li>
          <li>It's not a stable sort, meaning it may change the relative order of equal elements.</li>
          <li>The choice of pivot can significantly affect the algorithm's performance. Common strategies include choosing the first, last, or middle element, or a random element.</li>
          <li>Quick Sort is the default sorting algorithm in many programming language libraries, including C++'s std::sort() and Java's Arrays.sort() for primitive types.</li>
        </ul>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Use Cases:</h4>
        <ol style={{ paddingLeft: '20px' }}>
          <li><strong>General-purpose sorting:</strong> Quick Sort is often the go-to algorithm for sorting in many applications due to its efficiency.</li>
          <li><strong>Systems with good cache locality:</strong> Quick Sort's in-place nature makes it efficient for systems where memory access is expensive.</li>
          <li><strong>Large datasets:</strong> Quick Sort's average-case performance makes it suitable for sorting large amounts of data.</li>
          <li><strong>Parallel processing:</strong> Quick Sort can be easily parallelized, making it useful in multi-threaded applications.</li>
          <li><strong>Sorting arrays:</strong> Quick Sort is particularly efficient for sorting arrays, as it has good locality of reference.</li>
        </ol>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Example Implementation:</h4>
        <pre style={{ backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px' }}>
          <code>
{`function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`}
          </code>
        </pre>
        
        <p style={{ lineHeight: '1.6', color: '#444', marginTop: '15px' }}>
          Quick Sort's efficiency and widespread use make it an essential algorithm to understand in computer science. Its divide-and-conquer approach and partitioning strategy provide insights into algorithm design that extend beyond sorting problems.
        </p>
      </div>
    </div>
  );
};

export default QuickSortVisualizer;
