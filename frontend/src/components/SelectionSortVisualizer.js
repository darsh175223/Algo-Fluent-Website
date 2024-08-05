import React, { useState } from 'react';

const BarGraph = ({ array }) => {
    array.map((value, index) => console.log(index))

    return (
      <div className="bar-graph">
        {array.map((value, index) => (
          <div

            key={index}
            className="bar"
            style={{ 
              position: 'absolute'  ,
              height: 4.5*value+'px', 
              width: 1400/array.length+'px' ,
              bottom: '-100px',
              left: 50+(1400/array.length)*index+'px',
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

    for (let i = 0; i < arrayCopy.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arrayCopy.length; j++) {
        if (arrayCopy[j] < arrayCopy[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
        animations.push([...arrayCopy]);
      }
    }

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
        <h1>Selection Sort</h1>
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

        <BarGraph    array={array}  />



       

    </div>

        
  );
};

export default SelectionSortVisualizer;
