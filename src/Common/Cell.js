class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;

    this.links = new Map();

    this.neighbors = {
      north: undefined,
      south: undefined,
      east: undefined,
      west: undefined
    };
    
  }

  get row() {
    return this.row;
  }

  get column() {
    return this.column;
  }

  // instead of creating a setter for each direction
  setNeighbors(direction, value) {
    this.neighbors[direction] = value;
  }

  // instead of creating a getter for each direction
  getNeighbors(direction) {
    return this.neighbors[direction];
  }

  link(cell, bidirectional = true) {
    this.links.set(cell, true); 

    if (bidirectional) {
      cell.link(this, false);
    }
    return this;
  }

  unlink(cell, bidirectional = true) {
    this.links.delete(cell);

    if (bidirectional) {
      cell.unlink(this, false);
    }
    return this;
  }

  links() {
    return this.links.keys();
  }

  linked(cell) {
    return this.links.has(cell) || false;
  }

  neighbors() {
    const list = [];
    for(let direction in this.neighbors) {
      list.push(direction);
    }
    return list;
  }
}

export default Cell;