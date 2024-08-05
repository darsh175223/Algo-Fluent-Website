import React from 'react';

const DockerTutorial = () => {
  return (
    <div style={{ backgroundColor: '#d4eafc', minHeight: '100vh', padding: '20px' }}>
      <center>
        <h1>Docker Basics</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={require('.././pics/Docker_tutorial_image1.jpg')} alt="Python Image 1" />
          <img src={require('.././pics/Docker_tutorial_image2.jpg')} alt="Python Image 1" />
          <img src={require('.././pics/Docker_tutorial_image3.jpg')} alt="Python Image 1" />
  


        </div>
      </center>
    </div>
  );
}

export default DockerTutorial;
