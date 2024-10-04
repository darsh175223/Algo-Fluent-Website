import React, { useState } from 'react';

const UserDashboard = () => {
  const [stack, setStack] = useState([]);
  const [addValue, setAddValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear any existing error by using native alert
    const showError = (message) => {
      alert(message);
    };

    // Check if add value is not a number
    if (addValue && isNaN(addValue)) {
      showError('Please enter a valid number for Add');
      setAddValue('');
      return;
    }

    // Handle Add operation
    if (addValue) {
      setStack([...stack, parseInt(addValue)]);
      setAddValue('');
    }
  };

  const handlePop = () => {
    if (stack.length === 0) {
      alert('Cannot pop from an empty stack');
      return;
    }
    const newStack = [...stack];
    newStack.pop();
    setStack(newStack);
  };

  return (
    <div style={{
      backgroundImage: `url(${require('.././pics/Gradient.png')})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        width: '1100px',
        minHeight: '800px',
        backgroundColor: '#e3e2df',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        padding: '20px'
      }}>
        <center>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px' }}>Stack Visualization</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <div>
                <label htmlFor="add" style={{ marginRight: '8px' }}>Add:</label>
                <input
                  type="text"
                  id="add"
                  value={addValue}
                  onChange={(e) => setAddValue(e.target.value)}
                  style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#1E90FF',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    marginLeft: '8px',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  Add
                </button>
                <button
              onClick={handlePop}
              style={{
                backgroundColor: '#FF6347',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                marginBottom: '32px',
                cursor: 'pointer',
                border: 'none',
                marginLeft: '10px'
              }}
            >
              Pop
            </button>
              </div>
            </form>

            

            <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: '8px' }}>
              {stack.map((item, index) => (
                <div
                  key={index}
                  style={{
                    width: '47px',
                    height: '47px',
                    backgroundColor: '#D2B48C', // Cardboard color
                    border: '2px solid #8B4513', // Darker border for cardboard effect
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '4px',
                    fontSize: '16px',
                    color: 'black',
                    transform: index === stack.length - 1 ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s'
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            {stack.length === 0 && (
              <p style={{ color: '#888', marginTop: '16px' }}>Stack is empty</p>
            )}
          </div>
        </center>
      </div>
    </div>
  );
};

export default UserDashboard;
