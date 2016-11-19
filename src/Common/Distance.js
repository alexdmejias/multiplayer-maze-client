class Distance {
  constructor(rootId) {
    // this.root = root;

    this.cells = {};
    
    this.set(rootId, 0)
  }

  get (cellId) {
    return this.cells[cellId];
  }

  set (cellId, distance) {
    this.cells[cellId] = distance;
  }

  getKeys() {
    return Object.keys(this.cells);
  }

}

module.exports = Distance;