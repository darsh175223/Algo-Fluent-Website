import React, { useState } from 'react';

const Controls = ({ addElement, deleteElement }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    addElement(parseInt(inputValue, 10));
    setInputValue('');
  };

  const handleDelete = () => {
    deleteElement(parseInt(inputValue, 10));
    setInputValue('');
  };

  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Controls;
