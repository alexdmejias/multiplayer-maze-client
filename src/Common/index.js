let Grid = require('./Grid');
let BinaryTree = require('./BinaryTree');

let grid = new Grid(5, 5);

let maze = BinaryTree.on(grid);
console.log(BinaryTree.toStr(maze));