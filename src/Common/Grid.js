import Cell from './Cell';

class Grid {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    // this.grid;

    this.grid = this.prepareGrid();
    this.configureCells();
  }

  get rows() {
    return this.rows;
  }

  get columns() {
    return this.columns;
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
      cell.north = this.getCell(row - 1, col);
      cell.south = this.getCell(row + 1, col);
      cell.west = this.getCell(row, col - 1);
      cell.east = this.getCell(row, col + 1);
    });
  }

  getCell(row, column) {
    if ((row < 0) || (row > this.rows.length)) {
      return false;
    }

    if ((column < 0) || (column > this.columns.length)) {
      return false;
    }

    return this.grid[row][column];
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
    this.grid.forEach((row) => {
      // rb: yield row
    });
  }

  eachCell() {
    // todo
  }
}

export default Grid;
