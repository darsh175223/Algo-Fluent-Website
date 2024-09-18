import React, { useState } from 'react';

const introQuestion = {
  question: "What is the primary purpose of the C programming language?",
  options: [
    "Web development",
    "System programming",
    "Data analysis",
    "Game development"
  ],
  answer: "1", // Index of the correct answer
};

const secondQuestion = {
  question: "Which of the following is the correct way to declare a constant in C?",
  options: [
    "const int x = 10;",
    "int x = 10;",
    "#define x 10",
    "Both A and C"
  ],
  answer: "3", // Index of the correct answer
};

const thirdQuestion = {
  question: "What is the output of the following code: for(int i=0; i<5; i++) { printf(\"%d \", i); }?",
  options: [
    "0 1 2 3 4",
    "1 2 3 4 5",
    "0 1 2 3 4 5",
    "Error"
  ],
  answer: "0", // Index of the correct answer
};

const fourthQuestion = {
  question: "What does the following code do: int *ptr = &x;?",
  options: [
    "Declares a pointer to an integer",
    "Declares an integer variable",
    "Assigns the value of x to ptr",
    "None of the above"
  ],
  answer: "0", // Index of the correct answer
};

const fifthQuestion = {
  question: "What will be the output of the following code?",
  code: [
    "#include <stdio.h>",
    "void modify(int *p) {",
    "    *p += 5;",
    "}",
    "int main() {",
    "    int x = 10;",
    "    modify(&x);",
    "    printf(\"%d\", x);",
    "    return 0;",
    "}"
  ],
  options: [
    "10",
    "15",
    "5",
    "Error"
  ],
  answer: "1", // Index of the correct answer
};

const images = [
  require('.././pics/C_tutorial_image1.jpg'),
  require('.././pics/C_tutorial_image2.jpg'),
  require('.././pics/C_tutorial_image3.jpg'),
  require('.././pics/C_tutorial_image4.jpg'),
  require('.././pics/C_tutorial_image5.jpg'),
  require('.././pics/C_tutorial_image6.jpg'),
  require('.././pics/C_tutorial_image7.jpg'),
  require('.././pics/C_tutorial_image8.jpg'),
];

const JS = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSecondAnswer, setShowSecondAnswer] = useState(false);
  const [showThirdAnswer, setShowThirdAnswer] = useState(false);
  const [showFourthAnswer, setShowFourthAnswer] = useState(false);
  const [showFifthAnswer, setShowFifthAnswer] = useState(false);

  const handleOptionChange = (index) => {
    setSelectedOption(index);
    setShowAnswer(true);
  };

  const handleSecondOptionChange = (index) => {
    setSelectedOption(index);
    setShowSecondAnswer(true);
  };

  const handleThirdOptionChange = (index) => {
    setSelectedOption(index);
    setShowThirdAnswer(true);
  };

  const handleFourthOptionChange = (index) => {
    setSelectedOption(index);
    setShowFourthAnswer(true);
  };

  const handleFifthOptionChange = (index) => {
    setSelectedOption(index);
    setShowFifthAnswer(true);
  };

  return (
    <div style={{ backgroundColor: '#d4eafc', minHeight: '100vh', padding: '20px' }}>
      <center>
        <h1>C Basics</h1>
        <div style={{ marginBottom: '20px' }}>
          <h3>{introQuestion.question}</h3>
          <div>
            {introQuestion.options.map((option, index) => {
              let style = {};
              if (showAnswer) {
                if (index === parseInt(introQuestion.answer)) {
                  style = { color: '#00FF00', fontWeight: 'bold' }; // Bright green and bold for correct answer
                } else if (index === selectedOption) {
                  style = { color: 'red' }; // Selected wrong answer
                }
              }
              return (
                <div key={index}>
                  <input
                    type="radio"
                    name="introQuestion"
                    value={index}
                    onChange={() => handleOptionChange(index)}
                  />
                  <span style={style}>{option}</span>
                </div>
              );
            })}
          </div>
          {showAnswer && (
            <label>
              {`Correct Answer: ${introQuestion.options[introQuestion.answer]}`}
            </label>
          )}
        </div>
        
        {/* First Image */}
        <div style={{ margin: '20px 0' }}>
          <img src={images[0]} alt={`C Image 1`} />
        </div>

        {/* Second Question */}
        <div style={{ marginBottom: '20px' }}>
          <h3>{secondQuestion.question}</h3>
          <div>
            {secondQuestion.options.map((option, index) => {
              let style = {};
              if (showSecondAnswer) {
                if (index === parseInt(secondQuestion.answer)) {
                  style = { color: '#00FF00', fontWeight: 'bold' }; // Bright green and bold for correct answer
                } else if (index === selectedOption) {
                  style = { color: 'red' }; // Selected wrong answer
                }
              }
              return (
                <div key={index}>
                  <input
                    type="radio"
                    name="secondQuestion"
                    value={index}
                    onChange={() => handleSecondOptionChange(index)}
                  />
                  <span style={style}>{option}</span>
                </div>
              );
            })}
          </div>
          {showSecondAnswer && (
            <label>
              {`Correct Answer: ${secondQuestion.options[secondQuestion.answer]}`}
            </label>
          )}
        </div>

        {/* Second Image */}
        <div style={{ margin: '20px 0' }}>
          <img src={images[1]} alt={`C Image 2`} />
        </div>

        {/* Third Question */}
        <div style={{ marginBottom: '20px' }}>
          <h3>{thirdQuestion.question}</h3>
          <div>
            {thirdQuestion.options.map((option, index) => {
              let style = {};
              if (showThirdAnswer) {
                if (index === parseInt(thirdQuestion.answer)) {
                  style = { color: '#00FF00', fontWeight: 'bold' }; // Bright green and bold for correct answer
                } else if (index === selectedOption) {
                  style = { color: 'red' }; // Selected wrong answer
                }
              }
              return (
                <div key={index}>
                  <input
                    type="radio"
                    name="thirdQuestion"
                    value={index}
                    onChange={() => handleThirdOptionChange(index)}
                  />
                  <span style={style}>{option}</span>
                </div>
              );
            })}
          </div>
          {showThirdAnswer && (
            <label>
              {`Correct Answer: ${thirdQuestion.options[thirdQuestion.answer]}`}
            </label>
          )}
        </div>

        {/* Third Image */}
        <div style={{ margin: '20px 0' }}>
          <img src={images[2]} alt={`C Image 3`} />
        </div>

        {/* Fourth Question (Pointers) */}
        <div style={{ marginBottom: '20px' }}>
          <h3>{fourthQuestion.question}</h3>
          <div>
            {fourthQuestion.options.map((option, index) => {
              let style = {};
              if (showFourthAnswer) {
                if (index === parseInt(fourthQuestion.answer)) {
                  style = { color: '#00FF00', fontWeight: 'bold' }; // Bright green and bold for correct answer
                } else if (index === selectedOption) {
                  style = { color: 'red' }; // Selected wrong answer
                }
              }
              return (
                <div key={index}>
                  <input
                    type="radio"
                    name="fourthQuestion"
                    value={index}
                    onChange={() => handleFourthOptionChange(index)}
                  />
                  <span style={style}>{option}</span>
                </div>
              );
            })}
          </div>
          {showFourthAnswer && (
            <label>
              {`Correct Answer: ${fourthQuestion.options[fourthQuestion.answer]}`}
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

        {/* Fifth Question (Hard C Question) */}
        <div style={{ marginBottom: '20px' }}>
          <h3>{fifthQuestion.question}</h3>
          <div>
            {fifthQuestion.code.map((line, index) => (
              <h4 key={index}>{line}</h4>
            ))}
          </div>
          <div>
            {fifthQuestion.options.map((option, index) => {
              let style = {};
              if (showFifthAnswer) {
                if (index === parseInt(fifthQuestion.answer)) {
                  style = { color: '#00FF00', fontWeight: 'bold' }; // Bright green and bold for correct answer
                } else if (index === selectedOption) {
                  style = { color: 'red' }; // Selected wrong answer
                }
              }
              return (
                <div key={index}>
                  <input
                    type="radio"
                    name="fifthQuestion"
                    value={index}
                    onChange={() => handleFifthOptionChange(index)}
                  />
                  <span style={style}>{option}</span>
                </div>
              );
            })}
          </div>
          {showFifthAnswer && (
            <label>
              {`Correct Answer: ${fifthQuestion.options[fifthQuestion.answer]}`}
            </label>
          )}
        </div>
      </center>
    </div>
  );
}

export default JS;
