import React, { useState } from 'react';
import Controls from './Controls';
import TreeNode from './TreeNode';
import BST from '../dataStructures/BST';
import './BSTVisualizer.css';

const BSTVisualizer = () => {
  const [bst, setBst] = useState(new BST());
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [animating, setAnimating] = useState(false);

  const addElement = (value) => {
    if (animating) return;
    setAnimating(true);
    const newBst = new BST();
    newBst.root = bst.root;
    newBst.addElement(value);

    const newNodes = [];
    newBst.inOrderTraversal(newBst.root, (node) => newNodes.push(node));
    highlightNodes(newNodes, () => {
      setBst(newBst);
      setAnimating(false);
    });
  };

  const deleteElement = (value) => {
    if (animating) return;
    setAnimating(true);
    const newBst = new BST();
    newBst.root = bst.root;
    newBst.deleteElement(value);

    const newNodes = [];
    newBst.inOrderTraversal(newBst.root, (node) => newNodes.push(node));
    highlightNodes(newNodes, () => {
      setBst(newBst);
      setAnimating(false);
    });
  };

  const highlightNodes = (nodes, callback) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < nodes.length) {
        setHighlightedNode(nodes[currentIndex].value);
        currentIndex++;
      } else {
        clearInterval(interval);
        setHighlightedNode(null);
        callback();
      }
    }, 500);
  };

  return (
    <div className="visualizer-container">
        <h2>Binary Search Tree Visualizer</h2>

      <Controls addElement={addElement} deleteElement={deleteElement} />
      <div className="tree-container">
        {bst.root && <TreeNode node={bst.root} highlighted={highlightedNode} />}
      </div>

      <div className="bst-explanation" style={{ marginTop: 20, textAlign: 'left', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>What is a Binary Search Tree (BST)?</h3>
        <p>
          A Binary Search Tree is a hierarchical data structure composed of nodes, where each node contains a value and two references (left and right) to other nodes. The BST property states that for any given node, all values in its left subtree are less than the node's value, and all values in its right subtree are greater than the node's value.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>History and Creation:</h4>
        <p style={{ lineHeight: '1.6', color: '#444' }}>
          The concept of binary search trees was first introduced by P.F. Windley, A.D. Booth, A.J.T. Colin, and T.N. Hibbard in 1960. The data structure gained popularity due to its efficient searching, insertion, and deletion operations, especially when compared to linear data structures like arrays and linked lists.
        </p>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Trivia:</h4>
        <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
          <li>The worst-case time complexity for BST operations is O(n) when the tree becomes skewed (essentially a linked list).</li>
          <li>Self-balancing BSTs like AVL trees and Red-Black trees were developed to maintain O(log n) time complexity for all operations.</li>
          <li>The in-order traversal of a BST always produces a sorted list of elements.</li>
          <li>BSTs are the foundation for more complex data structures like heaps and B-trees.</li>
        </ul>
        
        <h4 style={{ color: '#333', marginTop: '20px' }}>Use Cases:</h4>
        <ol style={{ paddingLeft: '20px' }}>
          <li><strong>Implementing associative arrays:</strong> BSTs are used to implement map and set abstract data types.</li>
          <li><strong>Database indexing:</strong> Many database systems use B-trees, which are a generalization of BSTs, for efficient indexing.</li>
          <li><strong>Syntax trees:</strong> Compilers and interpreters use BSTs to represent and evaluate expressions.</li>
          <li><strong>File systems:</strong> Some file systems use BST variants to organize directory structures.</li>
          <li><strong>Game development:</strong> BSTs are used in game engines for spatial partitioning and collision detection.</li>
          <li><strong>Priority queues:</strong> While heaps are more common, BSTs can be used to implement priority queues.</li>
        </ol>
        
        <p style={{ lineHeight: '1.6', color: '#444', marginTop: '15px' }}>
          Binary Search Trees offer a good balance between fast search, insertion, and deletion operations. However, their performance can degrade in certain scenarios, leading to the development of more advanced tree structures. Understanding BSTs is crucial for grasping more complex tree-based data structures and algorithms.
        </p>
      </div>
    </div>
  );
};

export default BSTVisualizer;
