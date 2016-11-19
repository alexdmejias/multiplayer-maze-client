const Distance = require('./Distance');

class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;

    this.links = {};

    this.id = `${row}-${column}`;

    this.neighbors = {
      north: undefined,
      south: undefined,
      east: undefined,
      west: undefined
    };

    
  }

  // instead of creating a setter for each direction
  setNeighbors(direction, value) {
    this.neighbors[direction] = value;
  }

  // instead of creating a getter for each direction
  getNeighbors(direction) {
    return this.neighbors[direction];
  }

  setLink(cell, bidirectional = true) {
    this.links[cell.id] = cell;

    if (bidirectional) {
      cell.links[this.id] = this
    }
    return this;
  }

  delLink(cell, bidirectional = true) {
    delete this.links[cell.id];

    if (bidirectional) {
      delete cell.links[this.id];
    }
    return this;
  }

  getLinksIds () {
    return Object.keys(this.links);
  }

  getLinks () {
    return Object.values(this.links)
  }

  getLink (id) {
    return this.links[id];
  }

  isLinked (cell) {
    if (cell) {
      if (this.links[cell.id] ) {
        return this.links[cell.id]
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  setDistance (dis) {
    this.distance = dis; 
  }

  neighbors() {
    const list = [];
    for(let direction in this.neighbors) {
      if (this.neighbors.hasOwnProperty(direction)) {
        list.push(direction);
      }
    }
    return list;
  }

}

module.exports = Cell;