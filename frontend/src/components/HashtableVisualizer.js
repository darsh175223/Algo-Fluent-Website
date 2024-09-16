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
      <h2>Hash Table Visualizer</h2>
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

      <div className="hashtable-explanation" style={{ marginTop: 20, textAlign: 'left', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>What is a Hash Table?</h3>
        <p>
          A hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found. Ideally, the hash function will assign each key to a unique bucket, but most hash table designs employ an imperfect hash function, which might cause hash collisions where the hash function generates the same index for more than one key.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>History and Creation:</h4>
        <p style={{ lineHeight: '1.6', color: '#444' }}>
          The concept of hashing dates back to the 1950s. The idea of using hash tables for direct addressing was first proposed by Hans Peter Luhn of IBM in 1953. In 1956, Arnold Dumey popularized the idea of using hash tables for more general searching. The term "hash" was first used by Robert Morris in a memo at Bell Labs in 1967.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Trivia:</h4>
        <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
          <li>The load factor of a hash table is the ratio of the number of stored entries to the number of buckets.</li>
          <li>Cryptographic hash functions are a special class of hash functions that have additional security properties.</li>
          <li>Perfect hashing ensures that there are no collisions, but it requires knowing all keys in advance.</li>
          <li>The birthday paradox is closely related to hash function collision probability.</li>
        </ul>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Use Cases:</h4>
        <ol style={{ paddingLeft: '20px' }}>
          <li><strong>Database indexing:</strong> Hash tables are used to create indexes for faster data retrieval in databases.</li>
          <li><strong>Caches:</strong> Web browsers use hash tables to store cached objects for quicker access.</li>
          <li><strong>Symbol tables in compilers:</strong> Compilers use hash tables to keep track of variables and their attributes.</li>
          <li><strong>Password verification:</strong> Passwords are often stored as hashes for security reasons.</li>
          <li><strong>Blockchain:</strong> Hash functions are a crucial component in blockchain technology.</li>
          <li><strong>Spell checkers:</strong> Hash tables can efficiently store and lookup words in a dictionary.</li>
        </ol>
        
        <p style={{ lineHeight: '1.6', color: '#444', marginTop: '15px' }}>
          Hash tables provide constant-time average complexity for basic operations like insertion, deletion, and lookup, making them extremely efficient for many applications. However, they can suffer from collisions and may require resizing, which can impact performance in certain scenarios.
        </p>
      </div>
    </>
  );
};

export default HashtableVisualizer;
