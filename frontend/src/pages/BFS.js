import React, { useState, useEffect } from 'react';

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(id, x, y) {
    this.nodes.set(id, { id, x, y, neighbors: [] });
  }

  addEdge(id1, id2) {
    const node1 = this.nodes.get(id1);
    const node2 = this.nodes.get(id2);
    if (node1 && node2) {
      if (!node1.neighbors.includes(id2)) node1.neighbors.push(id2);
      if (!node2.neighbors.includes(id1)) node2.neighbors.push(id1);
    }
  }
}

const BFSVisualizer = () => {
  const [graph, setGraph] = useState(new Graph());
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [currentNode, setCurrentNode] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    generateGraph();
  }, []);

  const generateGraph = () => {
    const newGraph = new Graph();
    
    // Create nodes with random positions
    const numNodes = 7;
    const usedPositions = new Set();
    const basePositions = [
      [400, 50],  // Root position
      [200, 150], [600, 150],  // Level 1
      [100, 250], [300, 250], [500, 250], [700, 250]  // Level 2
    ];
    
    // Shuffle the positions except for the root
    const shuffledPositions = [
      basePositions[0],
      ...basePositions.slice(1).sort(() => Math.random() - 0.5)
    ];

    // Add nodes
    for (let i = 1; i <= numNodes; i++) {
      const [x, y] = shuffledPositions[i - 1];
      newGraph.addNode(i, x, y);
    }

    // Add random edges ensuring connectivity
    newGraph.addEdge(1, 2);
    newGraph.addEdge(1, 3);
    newGraph.addEdge(2, 4);
    newGraph.addEdge(2, 5);
    newGraph.addEdge(3, 6);
    newGraph.addEdge(3, 7);

    // Add a few random extra edges
    const possibleExtraEdges = [
      [4, 6], [5, 7], [4, 7], [5, 6]
    ];
    for (let i = 0; i < 2; i++) {
      const randomEdge = possibleExtraEdges[Math.floor(Math.random() * possibleExtraEdges.length)];
      newGraph.addEdge(...randomEdge);
    }

    setGraph(newGraph);
    setVisitedNodes(new Set());
    setCurrentNode(null);
    setIsSearching(false);
  };

  const startBFS = () => {
    if (isSearching) return;
    
    setIsSearching(true);
    setVisitedNodes(new Set());
    setCurrentNode(null);
    
    const visited = new Set();
    const queue = [1];  // Start from node 1
    
    const bfsStep = () => {
      if (queue.length === 0) {
        setIsSearching(false);
        return;
      }

      const nodeId = queue.shift();  // Dequeue
      if (!visited.has(nodeId)) {
        const node = graph.nodes.get(nodeId);
        visited.add(nodeId);
        
        // Add unvisited neighbors to queue
        const unvisitedNeighbors = node.neighbors.filter(neighbor => !visited.has(neighbor));
        queue.push(...unvisitedNeighbors);

        setCurrentNode(nodeId);
        setVisitedNodes(new Set(visited));
        
        setTimeout(bfsStep, 1000);
      } else {
        bfsStep();
      }
    };

    bfsStep();
  };

  const renderNodes = () => {
    return Array.from(graph.nodes.values()).map(node => (
      <g key={node.id}>
        {node.neighbors.map(neighborId => {
          const neighbor = graph.nodes.get(neighborId);
          if (node.id < neighborId) {  // Render each edge only once
            return (
              <line
                key={`${node.id}-${neighborId}`}
                x1={node.x}
                y1={node.y}
                x2={neighbor.x}
                y2={neighbor.y}
                stroke="#666"
                strokeWidth="2"
              />
            );
          }
          return null;
        })}
        <circle
          cx={node.x}
          cy={node.y}
          r={25}
          fill={
            currentNode === node.id
              ? 'yellow'
              : visitedNodes.has(node.id)
              ? '#28a745'
              : 'lightgray'
          }
          stroke="black"
        />
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          fill="black"
        >
          {node.id}
        </text>
      </g>
    ));
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.controlPanel}>
        <h1 style={styles.header}>Breadth First Search Visualizer</h1>
        <div style={styles.controls}>
          <button onClick={generateGraph} style={styles.button}>
            Generate New Graph
          </button>
          <button 
            onClick={startBFS} 
            style={styles.button}
            disabled={isSearching}
          >
            Start BFS
          </button>
        </div>
      </div>

      <svg width="800" height="400" style={styles.graphContainer}>
        {renderNodes()}
      </svg>

      <div style={styles.infoPanel}>
        <h3 style={styles.infoHeader}>How Breadth First Search Works:</h3>
        <p style={styles.infoText}>
          Breadth First Search (BFS) is a graph traversal algorithm that explores all the neighbor nodes at the present depth prior to moving on to nodes at the next depth level. It uses a queue to keep track of nodes to visit. The algorithm starts at a root node and explores all its neighbors before moving to the next level.
        </p>
        <p style={styles.infoText}>
          Color code: Yellow = Current node, Green = Visited node, Gray = Unvisited node
        </p>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    backgroundImage: `url(${require('.././pics/Gradient.png')})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  controlPanel: {
    backgroundColor: '#e3e2df',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '30px',
    width: '90%',
    maxWidth: '800px',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  graphContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  header: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  controls: {
    marginBottom: '15px',
  },
  button: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    marginLeft: '10px',
  },
  infoPanel: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'left',
    maxWidth: '800px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  infoHeader: {
    fontSize: '18px',
    borderBottom: '2px solid #333',
    paddingBottom: '10px',
  },
  infoText: {
    color: '#555',
    lineHeight: '1.6',
  },
};

export default BFSVisualizer;
