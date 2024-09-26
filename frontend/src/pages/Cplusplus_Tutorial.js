import React, { useState } from 'react'; // Ensure useState is imported

const JS = () => {
  // ... existing state variables ...
  const [selectedCppOption, setSelectedCppOption] = useState(null);
  const [showCppAnswer, setShowCppAnswer] = useState(false);

  // New state variables for the variable declaration question
  const [selectedVariableOption, setSelectedVariableOption] = useState(null);
  const [showVariableAnswer, setShowVariableAnswer] = useState(false);

  // New state variables for the array question
  const [selectedArrayOption, setSelectedArrayOption] = useState(null);
  const [showArrayAnswer, setShowArrayAnswer] = useState(false);

  const handleCppOptionChange = (index) => {
    setSelectedCppOption(index);
    setShowCppAnswer(true);
  };

  // New handler for the variable declaration question
  const handleVariableOptionChange = (index) => {
    setSelectedVariableOption(index);
    setShowVariableAnswer(true);
  };

  // New handler for the array question
  const handleArrayOptionChange = (index) => {
    setSelectedArrayOption(index);
    setShowArrayAnswer(true);
  };

  const images = [
    require('.././pics/C++_tutorial_image1.jpg'),
    require('.././pics/C++_tutorial_image2.jpg'),
    require('.././pics/C++_tutorial_image3.jpg'),
    require('.././pics/C++_tutorial_image4.jpg'),
    require('.././pics/C++_tutorial_image5.jpg'),
    require('.././pics/C++_tutorial_image6.jpg'),
    require('.././pics/C++_tutorial_image7.jpg'),
  ];

  // New state variables for the hard question
  const [selectedHardQuestionOption, setSelectedHardQuestionOption] = useState(null);
  const [showHardQuestionAnswer, setShowHardQuestionAnswer] = useState(false);

  // New handler for the hard question
  const handleHardQuestionOptionChange = (index) => {
    setSelectedHardQuestionOption(index);
    setShowHardQuestionAnswer(true);
  };

  return (
    <div style={{ backgroundColor: '#d4eafc', minHeight: '100vh', padding: '20px' }}>
      <center>
        <h1>C++ Basics</h1>

        {/* C++ Intro Question */}
        <div style={{ marginBottom: '20px' }}>
          <h3>What is the primary purpose of C++?</h3>
          <div>
            {["Object-oriented programming", "Web development", "Data analysis", "Game development"].map((option, index) => {
              let style = {};
              if (showCppAnswer) {
                if (index === 0) {
                  style = { color: '#00FF00', fontWeight: 'bold' }; // Bright green and bold for correct answer
                } else if (index === selectedCppOption) {
                  style = { color: 'red' }; // Selected wrong answer
                }
              }
              return (
                <div key={index}>
                  <input
                    type="radio"
                    name="cppIntroQuestion"
                    value={index}
                    onChange={() => handleCppOptionChange(index)}
                  />
                  <span style={style}>{option}</span>
                </div>
              );
            })}
          </div>
          {showCppAnswer && (
            <label>
              {`Correct Answer: Object-oriented programming`}
            </label>
          )}
        </div>

        {/* First Image */}
        <div style={{ margin: '20px 0' }}>
          <img src={images[0]} alt={`C Image 1`} />
        </div>

        {/* C++ Variable Declaration Question */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Which of the following is the correct way to declare a variable in C++?</h3>
          <div>
            {["int x;", "declare int x;", "var x: int;", "int x = 5;"].map((option, index) => {
              let style = {};
              if (showVariableAnswer) {
                if (index === 0) {
                  style = { color: '#00FF00', fontWeight: 'bold' }; // Bright green and bold for correct answer
                } else if (index === selectedVariableOption) {
                  style = { color: 'red' }; // Selected wrong answer
                }
              }
              return (
                <div key={index}>
                  <input
                    type="radio"
                    name="variableQuestion"
                    value={index}
                    onChange={() => handleVariableOptionChange(index)}
                  />
                  <span style={style}>{option}</span>
                </div>
              );
            })}
          </div>
          {showVariableAnswer && (
            <label>
              {`Correct Answer: int x;`}
            </label>
          )}
        </div>

        {/* Third Image */}
        <div style={{ margin: '20px 0' }}>
          <img src={images[2]} alt={`C Image 3`} />
        </div>

        {/* C++ Array Question */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Which of the following is the correct way to declare an array in C++?</h3>
          <div>
            {["int arr[10];", "array int arr[10];", "int[10] arr;", "arr int[10];"].map((option, index) => {
              let style = {};
              if (showArrayAnswer) {
                if (index === 0) {
                  style = { color: '#00FF00', fontWeight: 'bold' }; // Bright green and bold for correct answer
                } else if (index === selectedArrayOption) {
                  style = { color: 'red' }; // Selected wrong answer
                }
              }
              return (
                <div key={index}>
                  <input
                    type="radio"
                    name="arrayQuestion"
                    value={index}
                    onChange={() => handleArrayOptionChange(index)}
                  />
                  <span style={style}>{option}</span>
                </div>
              );
            })}
          </div>
          {showArrayAnswer && (
            <label>
              {`Correct Answer: int arr[10];`}
            </label>
          )}
        </div>

        {/* Remaining Images */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {images.slice(3).map((image, index) => (
            <div key={index} style={{ margin: '20px 0' }}>
              <img src={image} alt={`C Image ${index + 4}`} />
            </div>
          ))}
        </div>

        {/* Hard C++ Question */}
        <div style={{ marginBottom: '20px' }}>
          <h3>What will be the output of the following code?</h3>
          <div>
            <code>
              {`#include <iostream>\n` +
                `using namespace std;\n` +
                `void modify(int &p) {\n` +
                `    p += 5;\n` +
                `}\n` +
                `int main() {\n` +
                `    int x = 10;\n` +
                `    modify(x);\n` +
                `    cout << x;\n` +
                `    return 0;\n` +
                `}`}
            </code>
          </div>
          <div>
            {["10", "15", "5", "Error"].map((option, index) => {
              let style = {};
              if (showHardQuestionAnswer) {
                if (index === 1) { // Correct answer index
                  style = { color: '#00FF00', fontWeight: 'bold' }; // Bright green and bold for correct answer
                } else if (index === selectedHardQuestionOption) {
                  style = { color: 'red' }; // Selected wrong answer
                }
              }
              return (
                <div key={index}>
                  <input
                    type="radio"
                    name="hardQuestion"
                    value={index}
                    onChange={() => handleHardQuestionOptionChange(index)}
                  />
                  <span style={style}>{option}</span>
                </div>
              );
            })}
          </div>
          {showHardQuestionAnswer && (
            <label>
              {`Correct Answer: 15`}
            </label>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={require('.././pics/C++_tutorial_image1.jpg')} alt="Python Image 1" />
          <img src={require('.././pics/C++_tutorial_image2.jpg')} alt="Python Image 1" />
          <img src={require('.././pics/C++_tutorial_image3.jpg')} alt="Python Image 1" />
          <img src={require('.././pics/C++_tutorial_image4.jpg')} alt="Python Image 1" />
          <img src={require('.././pics/C++_tutorial_image5.jpg')} alt="Python Image 1" />
          <img src={require('.././pics/C++_tutorial_image6.jpg')} alt="Python Image 1" />
          <img src={require('.././pics/C++_tutorial_image7.jpg')} alt="Python Image 1" />
        </div>

      </center>
    </div>
  );
}

export default JS;
