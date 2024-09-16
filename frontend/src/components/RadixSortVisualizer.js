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

const RadixSortVisualizer = () => {
  const [arraySize, setArraySize] = useState(20);
  const [array, setArray] = useState(generateRandomArray(20));

  const handleGenerate = () => {
    setArray(generateRandomArray(arraySize));
  };

  const handleSort = () => {
    let arrayCopy = [...array];
    let animations = [];

    const getMax = (arr) => {
      return Math.max(...arr);
    };

    const countingSort = (arr, exp) => {
      let n = arr.length;
      let output = new Array(n).fill(0);
      let count = new Array(10).fill(0);

      for (let i = 0; i < n; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
      }

      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }

      for (let i = n - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
      }

      for (let i = 0; i < n; i++) {
        arr[i] = output[i];
        animations.push([...arr]);
      }
    };

    const radixSort = (arr) => {
      let max = getMax(arr);

      for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSort(arr, exp);
      }
    };

    radixSort(arrayCopy);

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
        <h1>Radix Sort (see explanation below)</h1>
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

      <div className="radix-sort-explanation" style={{ marginTop: 20, textAlign: 'left', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>What is Radix Sort?</h3>
        <p>
          Radix Sort is a non-comparative integer sorting algorithm that sorts data with integer keys by grouping the keys by individual digits that share the same significant position and value. It sorts the elements by processing each digit or character position, starting from the least significant digit to the most significant digit.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>History and Creation:</h4>
        <p style={{ lineHeight: '1.6', color: '#444' }}>
          The origin of Radix Sort dates back to 1887 when Herman Hollerith used it to sort punch cards. It gained prominence in the early days of computing when it was used to sort punched cards in mechanical sorting machines. The method became widely known in computer science after Harold H. Seward described it in 1954 in his MIT master's thesis.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Trivia:</h4>
        <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
          <li>Radix Sort can sort in linear time, O(nk), where n is the number of elements and k is the number of digits in the largest number.</li>
          <li>It's not a comparison-based sort, which allows it to surpass the Ω(n log n) lower bound of comparison-based sorting algorithms.</li>
          <li>Radix Sort can be implemented to work with strings and floating-point numbers, not just integers.</li>
          <li>The algorithm can sort from least significant digit (LSD) or most significant digit (MSD), with LSD being more common for in-place sorting.</li>
        </ul>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Use Cases:</h4>
        <ol style={{ paddingLeft: '20px' }}>
          <li><strong>Integer sorting:</strong> Particularly efficient for sorting large numbers of integers with a fixed number of digits.</li>
          <li><strong>String sorting:</strong> Can be adapted to sort strings lexicographically.</li>
          <li><strong>Network routing:</strong> Used in some network routers for sorting network addresses.</li>
          <li><strong>Suffix array construction:</strong> Useful in certain algorithms for text processing and compression.</li>
          <li><strong>External sorting:</strong> Can be effective when sorting large files with limited memory available.</li>
        </ol>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Example Implementation:</h4>
        <pre style={{ backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px' }}>
          <code>
{`function radixSort(arr) {
  const max = Math.max(...arr);
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(arr, exp);
  }
  
  return arr;
}

function countingSort(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);
  
  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }
  
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  for (let i = n - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }
  
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`}
          </code>
        </pre>
        
        <p style={{ lineHeight: '1.6', color: '#444', marginTop: '15px' }}>
          Radix Sort's efficiency for integer sorting and its ability to sort in linear time make it a valuable algorithm in specific scenarios. Understanding Radix Sort provides insights into non-comparison-based sorting techniques and demonstrates how algorithmic approaches can sometimes circumvent theoretical lower bounds.
        </p>
      </div>
    </div>
  );
};

export default RadixSortVisualizer;
