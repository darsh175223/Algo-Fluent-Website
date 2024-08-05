class DynamicArray {
    constructor() {
      this.array = [];
    }
  
    addElement(element) {
      this.array.push(element);
    }
  
    deleteElement(index) {
      if (index >= 0 && index < this.array.length) {
        this.array.splice(index, 1);
      }
    }
  }
  
  export default DynamicArray;
  