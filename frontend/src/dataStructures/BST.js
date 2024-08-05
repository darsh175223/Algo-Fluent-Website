class BSTNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  class BST {
    constructor() {
      this.root = null;
    }
  
    addElement(value) {
      const newNode = new BSTNode(value);
      if (!this.root) {
        this.root = newNode;
      } else {
        this._insertNode(this.root, newNode);
      }
    }
  
    _insertNode(node, newNode) {
      if (newNode.value < node.value) {
        if (!node.left) {
          node.left = newNode;
        } else {
          this._insertNode(node.left, newNode);
        }
      } else {
        if (!node.right) {
          node.right = newNode;
        } else {
          this._insertNode(node.right, newNode);
        }
      }
    }
  
    deleteElement(value) {
      this.root = this._deleteNode(this.root, value);
    }
  
    _deleteNode(node, value) {
      if (!node) return null;
  
      if (value < node.value) {
        node.left = this._deleteNode(node.left, value);
      } else if (value > node.value) {
        node.right = this._deleteNode(node.right, value);
      } else {
        if (!node.left && !node.right) {
          return null;
        } else if (!node.left) {
          return node.right;
        } else if (!node.right) {
          return node.left;
        } else {
          const temp = this._findMin(node.right);
          node.value = temp.value;
          node.right = this._deleteNode(node.right, temp.value);
        }
      }
      return node;
    }
  
    _findMin(node) {
      while (node.left) {
        node = node.left;
      }
      return node;
    }
  
    inOrderTraversal(node, callback) {
      if (node) {
        this.inOrderTraversal(node.left, callback);
        callback(node);
        this.inOrderTraversal(node.right, callback);
      }
    }
  
    getNodes() {
      const nodes = [];
      this.inOrderTraversal(this.root, (node) => nodes.push(node));
      return nodes;
    }
  }
  
  export default BST;
  