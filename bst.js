import BSTNode from "./node.js";

export default class BST {
  constructor(array) {
    this.root = array;
  }

  sortArray(array) {
    //Sorts array
    array = array.sort((a, b) => {
      return a - b;
    });

    //Deletes duplicates
    return [...new Set(array)];
  }
}
