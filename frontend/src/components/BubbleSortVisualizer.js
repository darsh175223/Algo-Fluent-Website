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
        <h1>Bubble Sort</h1>
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

export default BubbleSortVisualizer;
