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

  delete(value, node = this.root) {
    if (node === null) {
      return node;
    }

    if (value < node.data) {
      node.left = this.delete(value, node.left);
    } else if (value > node.data) {
      node.right = this.delete(value, node.right);
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
        node.right = this.delete(node.data, node.right);
      }
    }

    return node;
  }

  find(value) {
    let current = this.root;

    while (current.data != value && current.data != null) {
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return current;
  }

  levelOrder(func = createArray) {
    const levelOrderArray = [];

    if (this.root === null) {
      return;
    }

    const queue = [];
    queue.push(this.root);

    while (queue.length != 0) {
      let current = queue[0];
      if (func != createArray) {
        func(current);
      } else {
        func(levelOrderArray, current.data);
      }
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }

      queue.shift();
    }

    if (func === createArray) {
      return levelOrderArray;
    }
  }

  inOrder(func = createArray, node = this.root, array = []) {
    if (node === null) {
      return;
    }

    this.inOrder(func, node.left, array);

    if (func != createArray) {
      func(node);
    } else {
      func(array, node.data);
    }

    this.inOrder(func, node.right, array);

    if (func === createArray) {
      return array;
    }
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

function createArray(array, value) {
  array.push(value);
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
