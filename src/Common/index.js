let Grid = require('./Grid');
let BinaryTree = require('./BinaryTree');

let grid = new Grid(20, 20);

let maze = BinaryTree.on(grid);
console.log(BinaryTree.toStr(maze));