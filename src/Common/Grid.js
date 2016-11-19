const Cell = require('./Cell');
const Distance = require('./Distance');

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

      cell.id = `${row}-${column}`

      cell.neighbors = {
        north: this.getCell(row - 1, column),
        south: this.getCell(row + 1, column),
        west: this.getCell(row, column - 1),
        east: this.getCell(row, column + 1)
      }
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

  getDistances(root) {
    let distances = new Distance(root.id);
    let frontier = [root];
    let currDistance = 1;
    distances.set(root.id, currDistance);

    const printIds = (arr) => arr.reduce((prev, curr) => prev += ' ' + curr.id, ' ');

    while (frontier.length > 0) {
      const newFrontier = [];
      
      for (let i = 0; i < frontier.length; i++ ) {
        const currCell = frontier[i];
        const links = currCell.getLinksIds();
        

        for (let h = 0; h < links.length; h++) {
          const currLink = links[h];
          if (distances.get(currLink)) {
            continue;
          } else {
            distances.set(currLink, currDistance);
            newFrontier.push(currCell.getLink(currLink));
          }
        }
      }
      frontier = newFrontier;
      currDistance++;
    }

    return distances;
  }

}

module.exports = Grid;
