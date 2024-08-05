import React, { useState } from 'react';
import Controls from './Controls';
import './ArrayVisualizer.css';

const ArrayVisualizer = () => {
  const [array, setArray] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const addElement = (element) => {
    setAnimating(true);
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < array.length) {
        setHighlightedIndex(currentIndex);
        currentIndex++;
      } else {
        clearInterval(interval);
        setArray([...array, element]);
        setHighlightedIndex(-1);
        setAnimating(false);
      }
    }, 500);
  };

  const deleteElement = (element) => {
    setAnimating(true);
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (array[currentIndex] != element) {
        setHighlightedIndex(currentIndex);
        currentIndex++;
      } else {

        
        setHighlightedIndex(currentIndex);
        setArray(array.filter((el) => el !== element));
        clearInterval(interval);
        setHighlightedIndex(-1);
        setAnimating(false);
      }
    }, 500);
  };

  return (
    <div className="visualizer-container" style={{ marginBottom: 20 }}>
              <h2>Linked-List Visualizer</h2>
        <div style={{ marginBottom: 75 }}>
        <Controls addElement={addElement} deleteElement={deleteElement} />
        </div>
      
      <div className="array-container" style={{ marginBottom: 20 }}>
        {array.map((el, index) => (
          <div
            key={index}
            className={`array-item ${index === highlightedIndex ? 'highlight' : ''}`}
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualizer;
