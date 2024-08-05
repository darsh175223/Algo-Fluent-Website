import React from 'react';

const Home = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#1f2833', width: '40%', padding: '20px'}}>
        <h1 style={{ color: '#66fcf1', fontSize: '88px', marginBottom: '100px', fontFamily: 'Roboto' }}>Sort it out</h1>
        <h3 style={{ color: 'white', fontSize: '28px' }}> Visualizing data structures and algorithms interactively.</h3>
      </div>
      <div style={{ backgroundColor: '#45a29e', width: '60%', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={require('.././pics/pngtree-binary-tree-diagrams-flat-png-image_12524243.png')} alt="Algofluent" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    </div>
  );
}

export default Home;
