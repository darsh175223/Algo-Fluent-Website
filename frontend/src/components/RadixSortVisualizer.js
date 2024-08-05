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
        <h1>Radix Sort</h1>
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
    </div>
  );
};

export default RadixSortVisualizer;
