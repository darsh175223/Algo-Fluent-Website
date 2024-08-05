import React from 'react';

const Ball = () => {
  return (
    <div style={{ backgroundColor: '#d4eafc', minHeight: '100vh', padding: '20px' }}>
      <center>
        <h1>Python Basics</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={require('.././pics/pythonCS1.png')} alt="Python Image 1" />
          <img src={require('.././pics/pythonCS2.png')} alt="Python Image 2" />
        </div>
      </center>
    </div>
  );
}

export default Ball;
