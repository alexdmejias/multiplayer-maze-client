class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;

    this.links = {
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

  setDirection(direction, value) {
    this.directions[direction] = value;
  }

  getDirection(direction) {
    return this.directions[direction];
  }

  link(cell, bidi = true) {
    this.links[cell] = true;
    if (bidi) {
      cell.link(this, bidi);
    }
    return this;
  }

  unlink(cell, bidi = true) {
    delete this.links[cell];
    if (bidi) {
      cell.unlink(this, bidi);
    }
    return this;
  }

  links() {
    return Object.keys(this.links);
  }

  linked(cell) {
    return Object.keys(this.links).indexOf(cell) > -1;
  }

  neighbors() {
    // TODO
  }
}

export default Cell;