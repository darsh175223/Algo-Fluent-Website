import React, { useState } from 'react';

const HashtableVisualizer = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputSize, setSizeValue] = useState('');
  const [columns, setColumns] = useState(10);
  const [hashTable, setHashTable] = useState(Array(10).fill(null));
  const [notification, setNotification] = useState('');

  const generateTable = (numColumns) => {
    const headers = [];
    for (let i = 1; i <= numColumns; i++) {
      headers.push(` ${i-1}`);
    }
    return headers;
  };

  const tableHeaders = generateTable(columns);

  const handleGenerateTable = () => {
    const size = parseInt(inputSize, 10);
    if (!isNaN(size) && size > 0) {
      setColumns(size);
      setHashTable(Array(size).fill(null));
    }
  };

  const handleAddNumber = () => {
    const num = parseInt(inputValue, 10);
    if (isNaN(num)) return;

    const hashTableCopy = [...hashTable];
    let index = num % columns;
    let startIndex = index;
    let added = false;

    while (!added) {
      if (hashTableCopy[index] === null) {
        hashTableCopy[index] = num;
        added = true;
      } else {
        index = (index + 1) % columns;
        if (index === startIndex) {
          setNotification('Hashtable is full');
          return;
        }
      }
    }

    setHashTable(hashTableCopy);
    setInputValue('');
    setNotification('');
  };

  return (
    <>
      <h2>Controls</h2>
      <div>
        <label>Change size: </label>
        <input
          type="number"
          value={inputSize}
          onChange={(e) => setSizeValue(e.target.value)}
        />
        <button onClick={handleGenerateTable}>Generate Table</button>

        <label>======| Add number: </label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleAddNumber}>Add Number</button>

        {notification && <p style={{ color: 'red' }}>{notification}</p>}

        {/* Table */}
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', margin: '20px 0' }}>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} style={{ border: '1px solid black', padding: '8px' }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {hashTable.map((cell, index) => (
                <td key={index} style={{ border: '1px solid black', padding: '8px' }}>
                  {cell !== null ? cell : ''}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HashtableVisualizer;
