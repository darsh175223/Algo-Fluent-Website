import React, { useState, useEffect } from 'react';

class Graph {
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
  }

  addNode(id, x, y) {
    this.nodes.set(id, { id, x, y, neighbors: [] });
  }

  addEdge(id1, id2, weight) {
    const node1 = this.nodes.get(id1);
    const node2 = this.nodes.get(id2);
    if (node1 && node2) {
      if (!node1.neighbors.find(n => n.id === id2)) {
        node1.neighbors.push({ id: id2, weight });
      }
      if (!node2.neighbors.find(n => n.id === id1)) {
        node2.neighbors.push({ id: id1, weight });
      }
    }
  }

  clear() {
    this.nodes.clear();
    this.edges.clear();
  }
}

const DijkstraVisualizer = () => {
  const [graph, setGraph] = useState(new Graph());
  const [distances, setDistances] = useState({});
  const [currentNode, setCurrentNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [isSearching, setIsSearching] = useState(false);
  const [shortestPath, setShortestPath] = useState([]);
  const [previousNodes, setPreviousNodes] = useState({});

  const generateGraph = () => {
    const newGraph = new Graph();
    newGraph.clear();

    // Define nodes with slightly randomized positions
    const basePositions = [
      [400, 50],
      [200, 150], [600, 150],
      [100, 250], [300, 250], [500, 250], [700, 250]
    ].map(([x, y]) => [
      x + (Math.random() - 0.5) * 40,
      y + (Math.random() - 0.5) * 40
    ]);

    for (let i = 1; i <= basePositions.length; i++) {
      const [x, y] = basePositions[i - 1];
      newGraph.addNode(i, x, y);
    }

    // Add edges with random weights
    const possibleEdges = [
      [1, 2], [1, 3], [2, 4], [2, 5], [3, 6], [3, 7], [4, 6], [5, 7]
    ];

    possibleEdges.forEach(([from, to]) => {
      const weight = Math.floor(Math.random() * 9) + 1;
      newGraph.addEdge(from, to, weight);
    });

    setGraph(newGraph);
    setVisitedNodes(new Set());
    setDistances({});
    setShortestPath([]);
    setPreviousNodes({});
    setIsSearching(false);
    setCurrentNode(null);
  };

  useEffect(() => {
    generateGraph();
  }, []);

  const startDijkstra = () => {
    if (isSearching) return;

    setIsSearching(true);
    const initialDistances = {};
    const visited = new Set();
    const previous = {};

    graph.nodes.forEach((node, id) => {
      initialDistances[id] = id === 1 ? 0 : Infinity;
    });

    const pq = [[1, 0]];

    const dijkstraStep = () => {
      if (pq.length === 0) {
        // Find the path to the furthest node
        const endNode = Math.max(...Array.from(graph.nodes.keys()));
        const path = [];
        let current = endNode;
        
        while (current !== undefined) {
          path.unshift(current);
          current = previous[current];
        }
        
        setShortestPath(path);
        setIsSearching(false);
        return;
      }

      const [nodeId, currentDistance] = pq.shift();

      if (!visited.has(nodeId)) {
        visited.add(nodeId);
        const node = graph.nodes.get(nodeId);

        node.neighbors.forEach(neighbor => {
          const newDist = currentDistance + neighbor.weight;
          if (newDist < initialDistances[neighbor.id]) {
            initialDistances[neighbor.id] = newDist;
            previous[neighbor.id] = nodeId;
            pq.push([neighbor.id, newDist]);
          }
        });

        pq.sort((a, b) => a[1] - b[1]);
        setDistances({ ...initialDistances });
        setPreviousNodes({ ...previous });
        setCurrentNode(nodeId);
        setVisitedNodes(new Set(visited));

        setTimeout(dijkstraStep, 1000);
      } else {
        dijkstraStep();
      }
    };

    dijkstraStep();
  };

  const renderNodes = () => {
    return Array.from(graph.nodes.values()).map(node => (
      <g key={node.id}>
        {node.neighbors.map(neighbor => {
          const neighborNode = graph.nodes.get(neighbor.id);
          const isInPath = shortestPath.includes(node.id) && shortestPath.includes(neighbor.id) &&
            Math.abs(shortestPath.indexOf(node.id) - shortestPath.indexOf(neighbor.id)) === 1;
          
          return (
            <g key={`${node.id}-${neighbor.id}`}>
              <line
                x1={node.x}
                y1={node.y}
                x2={neighborNode.x}
                y2={neighborNode.y}
                stroke={isInPath ? "#800080" : "#666"}
                strokeWidth={isInPath ? "4" : "2"}
              />
              <text
                x={(node.x + neighborNode.x) / 2}
                y={(node.y + neighborNode.y) / 2}
                fill="black"
                fontSize="14"
              >
                {neighbor.weight}
              </text>
            </g>
          );
        })}
        <circle
          cx={node.x}
          cy={node.y}
          r={25}
          fill={
            shortestPath.includes(node.id) ? '#800080' :
            currentNode === node.id ? 'yellow' :
            visitedNodes.has(node.id) ? '#28a745' : 'lightgray'
          }
          stroke="black"
        />
        <text x={node.x} y={node.y + 5} textAnchor="middle" fill="black">
          {node.id}
        </text>
        {distances[node.id] !== undefined && (
          <text x={node.x} y={node.y - 30} textAnchor="middle" fill="black">
            {distances[node.id] === Infinity ? '∞' : distances[node.id]}
          </text>
        )}
      </g>
    ));
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.controlPanel}>
        <h1 style={styles.header}>Dijkstra Algorithm Visualizer</h1>
        <div style={styles.controls}>
          <button onClick={generateGraph} style={styles.button}>
            Generate New Graph
          </button>
          <button onClick={startDijkstra} style={styles.button} disabled={isSearching}>
            Start Dijkstra
          </button>
        </div>
      </div>

      <svg width="800" height="400" style={styles.graphContainer}>
        {renderNodes()}
      </svg>

      <div style={styles.infoPanel}>
        <h3 style={styles.infoHeader}>How Dijkstra's Algorithm Works:</h3>
        <p style={styles.infoText}>
          Dijkstra's algorithm finds the shortest path between nodes in a graph. It starts at the source node, explores all possible paths to its neighbors, and picks the shortest path. The process continues until all nodes have been visited.
        </p>
        <p style={styles.infoText}>
          Color code: Purple = Shortest path, Yellow = Current node, Green = Visited node, Gray = Unvisited node.
        </p>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url(${require('.././pics/Gradient.png')})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  controlPanel: {
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '30px',
    width: '90%',
    maxWidth: '800px',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  graphContainer: {
    backgroundColor: 'white',
    borderRadius: '10px',
    marginBottom: '30px',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#218838',
    },
    '&:disabled': {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed',
    },
  },
  infoPanel: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '800px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  infoHeader: {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#333',
  },
  infoText: {
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
};

export default DijkstraVisualizer;