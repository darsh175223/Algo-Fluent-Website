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

      <div className="linked-list-explanation" style={{ marginTop: 20, textAlign: 'left', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>What is a Linked List?</h3>
        <p>
          A linked list is a linear data structure where elements are stored in nodes. Each node contains a data field and a reference (or link) to the next node in the sequence. Unlike arrays, linked lists do not store elements in contiguous memory locations, allowing for efficient insertion and deletion of elements.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>History and Creation:</h4>
        <p style={{ lineHeight: '1.6', color: '#444' }}>
          Linked lists were first introduced in 1955-1956 by Allen Newell, Cliff Shaw, and Herbert A. Simon at RAND Corporation as part of the Information Processing Language (IPL) for their work on artificial intelligence. The concept was further developed and popularized in the 1960s with the advent of dynamic memory allocation in programming languages.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Trivia:</h4>
        <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
          <li>The XOR linked list is a memory-efficient variation that uses bitwise XOR to store addresses.</li>
          <li>In some implementations, the last node's pointer in a circular linked list points back to the first node, creating a loop.</li>
          <li>The Linux kernel uses a unique intrusive linked list implementation for efficient memory management.</li>
        </ul>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Use Cases:</h4>
        <ol style={{ paddingLeft: '20px' }}>
          <li><strong>Undo functionality:</strong> Applications use linked lists to implement undo/redo features efficiently.</li>
          <li><strong>Music playlists:</strong> Linked lists are ideal for creating and managing playlists in music players.</li>
          <li><strong>Browser history:</strong> Web browsers often use linked lists to store and navigate through browsing history.</li>
          <li><strong>Image viewers:</strong> Linked lists can be used to implement efficient navigation between images.</li>
          <li><strong>Memory management:</strong> Operating systems use linked lists to keep track of allocated and free memory blocks.</li>
          <li><strong>Polynomial arithmetic:</strong> Linked lists can represent polynomials, making addition and multiplication operations easier.</li>
        </ol>
        
        <p style={{ lineHeight: '1.6', color: '#444', marginTop: '15px' }}>
          While arrays are often the go-to data structure for many programming tasks, linked lists offer unique advantages in scenarios requiring frequent insertions and deletions, especially when the size of the data structure is unknown or constantly changing.
        </p>
      </div>
    </div>
  );
};

export default ArrayVisualizer;
