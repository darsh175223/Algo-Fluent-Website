import React, { useState, useEffect } from 'react';
import DrawingCanvas from '../components/DrawingCanvas';
import axios from 'axios';

const DigitPage = () => {
  return (
    <div style={{ backgroundColor: '#d4eafc', minHeight: '100vh', padding: '20px' }}>
        <center>
        <h1>Handwritten Digit Recognition</h1>
        <h4>Normal canvas not available</h4>

        <DrawingCanvas />

        </center>

     
    </div>
  );
};

export default DigitPage;
