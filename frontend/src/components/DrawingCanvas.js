import React from 'react';
import axios from 'axios';

const OpenTkinterWindowButton = () => {
  const handleButtonClick = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/open-window');
      console.log(response.data.message);
    } catch (error) {
      console.error('Error opening Tkinter window:', error);
    }
  };

  return (
    <button onClick={handleButtonClick}>Open in another window</button>
  );
};

export default OpenTkinterWindowButton;
