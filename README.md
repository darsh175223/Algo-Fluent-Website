# Algofluent

Algofluent is a dynamic website designed to visualize various data structures and algorithms. It features interactive visualizations for data structures like arrays, hashmaps, and binary search trees, as well as algorithm visualizations for selection sort, linear regression, logistic regression, and a Dijkstra's algorithm-based pathfinding game. The project also includes user authentication using the MERN stack and handwritten digit recognition using a Python backend.

## Features

### Data Structure Visualizations
- **Arrays**: Add or delete elements and see the structure update in real-time.
- **Hashmaps**: Visualize the placement and retrieval of elements.

### Algorithm Visualizations
- **Selection Sort**: An interactive visualizer with a slider to adjust the array size, a sort button, and a bar graph to display the array.
- **Linear Regression**: Add points to an interactive coordinate graph, which generates and updates a regression line automatically.
- **Logistic Regression**: Visualize logistic regression using Chart.js and the `ml-logistic-regression` library.
- **Pathfinding Game**: A game where a rat uses Dijkstra's algorithm to find the shortest path to a piece of cheese, with adjustable obstacles and start/end points.

### Additional Features
- **Handwritten Digit Recognition**: Draw a number on a canvas and have it recognized by a Python-based program.
- **User Authentication**: MERN stack implementation for user sign-in and account creation.

## Project Structure

- **Frontend**: Built with ReactJS.
  - **Data Structure and Algorithm Visualizers**: Various components for visualizing data structures and algorithms.
  - **User Authentication**: Components for sign-in and account creation pages.
- **Backend**: Node.js and Express.
  - **User Authentication**: RESTful APIs for managing user data.
  - **Digit Recognition**: Python-based service for recognizing handwritten digits.
- **Deployment**: Deployed using Docker and Render.

## Installation

### Prerequisites
- Node.js
- npm
- Python (for digit recognition backend)
- Docker

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/darsh175223/algofluent.git
   cd algofluent
