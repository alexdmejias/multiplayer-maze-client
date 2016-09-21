const Cell = require('./Cell');

class Grid {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.grid = this.prepareGrid();
    this.configureCells();
  }

  prepareGrid() {
    const grid = []
    for (var i = 0; i < this.rows; i++) {
      grid.push([]);
      for (var h = 0; h < this.columns; h++) {
        grid[i].push(new Cell(i, h));
      }
    }

    return grid;
  }

  configureCells() {
    this.eachCell().forEach((cell) => {
      const {row, column} = cell;

      // assign the neighbors for each cell
      cell.neighbors.north = this.getCell(row - 1, column);
      cell.neighbors.south = this.getCell(row + 1, column);
      cell.neighbors.west = this.getCell(row, column - 1);
      cell.neighbors.east = this.getCell(row, column + 1);
    });
  }

  getCell(row, column) {
    if (this.grid[row] && this.grid[row][column]) {
      return this.grid[row][column];
    }

  }

  randomCell() {
    const row = Math.floor(Math.random() * this.rows);
    const column = Math.floor(Math.random() * this.columns);

    return this.grid[row][column];
  }

  size() {
    return this.rows * this.columns;
  }

  eachRow() {
    return this.grid;
  }

  eachCell() {
    return this.grid.reduce((prev, curr, currIndex) => {
      return prev.concat(curr);
    }, []);
  }
}

module.exports = Grid;
