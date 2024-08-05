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
    </div>
  );
};

export default BSTVisualizer;
