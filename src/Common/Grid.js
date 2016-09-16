import Cell from './Cell';

class Grid {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    configure_cells();
  }

  get rows() {
    return this.rows;
  }

  get columns() {
    return this.columns;
  }

  configure_cells() {

  }
}

export default Grid;