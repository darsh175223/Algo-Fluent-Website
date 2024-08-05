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
        <h1>Merge Sort</h1>
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

export default MergeSortVisualizer;
