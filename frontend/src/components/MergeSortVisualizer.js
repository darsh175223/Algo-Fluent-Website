import React, { useState } from 'react';

const BarGraph = ({ array }) => {
  array.map((value, index) => console.log(index));

  return (
    <div className="bar-graph">
      {array.map((value, index) => (
        <div
          key={index}
          className="bar"
          style={{
            position: 'absolute',
            height: 4.5 * value + 'px',
            width: 1400 / array.length + 'px',
            bottom: '-100px',
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

const MergeSortVisualizer = () => {
  const [arraySize, setArraySize] = useState(20);
  const [array, setArray] = useState(generateRandomArray(20));

  const handleGenerate = () => {
    setArray(generateRandomArray(arraySize));
  };

  const handleSort = () => {
    let arrayCopy = [...array];
    let animations = [];

    const mergeSort = (arr, l, r) => {
      if (l < r) {
        const m = Math.floor((l + r) / 2);
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
      }
    };

    const merge = (arr, l, m, r) => {
      const n1 = m - l + 1;
      const n2 = r - m;

      let L = new Array(n1);
      let R = new Array(n2);

      for (let i = 0; i < n1; i++) {
        L[i] = arr[l + i];
      }
      for (let j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
      }

      let i = 0, j = 0, k = l;

      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        animations.push([...arr]);
        k++;
      }

      while (i < n1) {
        arr[k] = L[i];
        animations.push([...arr]);
        i++;
        k++;
      }

      while (j < n2) {
        arr[k] = R[j];
        animations.push([...arr]);
        j++;
        k++;
      }
    };

    mergeSort(arrayCopy, 0, arrayCopy.length - 1);

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
        <h1>Merge Sort (see explanation below)</h1>
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

      <div className="merge-sort-explanation" style={{ marginTop: 20, textAlign: 'left', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>What is Merge Sort?</h3>
        <p>
          Merge Sort is an efficient, stable, divide-and-conquer sorting algorithm. It works by dividing the unsorted list into n sublists, each containing one element (a list of one element is considered sorted). Then, it repeatedly merges sublists to produce new sorted sublists until there is only one sublist remaining.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>History and Creation:</h4>
        <p style={{ lineHeight: '1.6', color: '#444' }}>
          Merge Sort was invented by John von Neumann in 1945. It was one of the first sorting algorithms to be rigorously analyzed in terms of its computational complexity. The algorithm's "divide and conquer" approach became a cornerstone in the development of many other efficient algorithms.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Trivia:</h4>
        <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
          <li>Merge Sort has a time complexity of O(n log n), making it much more efficient than simpler algorithms like Bubble Sort for large datasets.</li>
          <li>It is a stable sort, meaning that it preserves the relative order of equal elements in the sorted output.</li>
          <li>Merge Sort is the algorithm of choice for sorting linked lists due to its ability to sort without random access to elements.</li>
          <li>The algorithm requires additional space proportional to the size of the input array, which can be a drawback in memory-constrained environments.</li>
        </ul>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Use Cases:</h4>
        <ol style={{ paddingLeft: '20px' }}>
          <li><strong>External sorting:</strong> Used when the data to be sorted is too large to fit into memory.</li>
          <li><strong>Sorting linked lists:</strong> Merge Sort is particularly efficient for sorting linked lists.</li>
          <li><strong>Inversion count problem:</strong> Can be used to efficiently solve the problem of counting inversions in an array.</li>
          <li><strong>Parallel processing:</strong> The divide-and-conquer nature of Merge Sort makes it suitable for parallel implementation.</li>
          <li><strong>Stable sorting requirement:</strong> When maintaining the relative order of equal elements is important.</li>
        </ol>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Example Implementation:</h4>
        <pre style={{ backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px' }}>
          <code>
{`function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`}
          </code>
        </pre>
        
        <p style={{ lineHeight: '1.6', color: '#444', marginTop: '15px' }}>
          Merge Sort's efficiency and stability make it a popular choice in various applications, especially when dealing with large datasets or when stable sorting is required. Its divide-and-conquer approach also serves as an excellent introduction to more advanced algorithmic concepts.
        </p>
      </div>
    </div>
  );
};

export default MergeSortVisualizer;
