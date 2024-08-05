import React, { useRef, useEffect, useState } from 'react';
import './BSTVisualizer.css';

const TreeNode = ({ node, highlighted, level }) => {
  const nodeRef = useRef(null);
  const [positions, setPositions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (nodeRef.current) {
      const { x, y, width, height } = nodeRef.current.getBoundingClientRect();
      setPositions({
        x: x + width / 2,
        y: y + height / 2,
      });
    }
  }, [nodeRef]);

  return (
    <div className="tree-node" ref={nodeRef}>
      <div className={`node-value ${highlighted ? 'highlight' : ''}`}>{node.value}</div>
      <div className="tree-children">
        {node.left && (
          <>
            <svg className="tree-arrow left-arrow">
              <line x1="50%" y1="50%" x2="0%" y2="100%" />
            </svg>
            <div className="tree-branch left-branch">
              <TreeNode node={node.left} highlighted={highlighted} level={level + 1} />
            </div>
          </>
        )}
        {node.right && (
          <>
            <svg className="tree-arrow right-arrow">
              <line x1="50%" y1="50%" x2="100%" y2="100%" />
            </svg>
            <div className="tree-branch right-branch">
              <TreeNode node={node.right} highlighted={highlighted} level={level + 1} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TreeNode;
