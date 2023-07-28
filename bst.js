import BSTNode from "./node.js";

export default class BST {
  constructor(array) {
    this.root = this.buildTree(
      sortArray(array),
      0,
      sortArray(array).length - 1
    );
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const root = new BSTNode(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new BSTNode(value);
    } else {
      let parent = this.root;
      let current = this.root;

      while (current != null) {
        parent = current;
        if (value < current.data) {
          current = current.left;
        } else if (value > current.data) {
          current = current.right;
        } else {
          return;
        }
      }

      if (value < parent.data) {
        parent.left = new BSTNode(value);
      } else {
        parent.right = new BSTNode(value);
      }
    }
  }

  delete(value) {
    this.root = this.deleteHelper(this.root, value);
  }

  deleteHelper(node, value) {
    if (node === null) {
      return null;
    } else if (value < node.data) {
      node.left = this.deleteHelper(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteHelper(node.right, value);
    } else {
      if (node.left == null && node.right == null) {
        return null;
      } else if (node.right === null) {
        return node.left;
      } else if (node.left === null) {
        return node.right;
      } else {
        let parent = node;
        let current = node.right;

        while (current != null) {
          parent = current;
          current = current.left;
        }
        node.data = parent.data;
        node.right = this.deleteHelper(node.right, node.data);
      }
    }

    return node;
  }

  find(value) {
    //TODO
  }
}

function sortArray(array) {
  //Sorts array
  array = array.sort((a, b) => {
    return a - b;
  });

  //Deletes duplicates
  return [...new Set(array)];
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
