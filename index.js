import BST from "./bst.js";
import { prettyPrint } from "./bst.js";

const array = [];

for (let i = 0; i < 100; i++) {
  array.push(Math.floor(Math.random() * 100));
}

const Tree = new BST(array);

if (Tree.isBalanced()) {
  console.log("The tree is balanced");
}

console.log(Tree.levelOrder());
console.log(Tree.preOrder());
console.log(Tree.postOrder());
console.log(Tree.inOrder());

for (let i = 0; i < 100; i++) {
  Tree.insert(Math.floor(Math.random() * 100) + 100);
}

if (!Tree.isBalanced()) {
  console.log("The tree is unbalanced");
}

Tree.rebalance();
console.log("Balancing...");

if (Tree.isBalanced()) {
  console.log("The tree is now balanced");
}

console.log(Tree.levelOrder());
console.log(Tree.preOrder());
console.log(Tree.postOrder());
console.log(Tree.inOrder());

prettyPrint(Tree.root)