const cell = require('./Cell');

class BinaryTree {
  static on(grid) {
    for (let i = 0; i < grid.eachCell().length; i++ ) {
      let cell = grid.eachCell()[i];
      let neighbors = [];

      if (cell.neighbors.north) {
        neighbors.push(cell.neighbors.north)
      }

      if (cell.neighbors.east) {
        neighbors.push(cell.neighbors.east)
      }

      let index = Math.floor(Math.random() * neighbors.length);
      let neighbor = neighbors[index];

      if (neighbor) {
        cell.link(neighbor);
      }
  }
    return grid;
  }

  static toStr(preparedGrid) {
    let output = `+${('---+').repeat(preparedGrid.columns)}\n`;
    preparedGrid.eachRow().forEach((row) => {
      let top = '|';
      let bottom = '+';
      row.forEach((cell) => {
        if (!cell) {
          let cell= new Cell(-1, -1);
        }

        let body = '   ';
        let eastBoundry = (cell.linked(cell.neighbors.east) ? ' ' : '|');
        top += body + eastBoundry;

        let southBoundry = (cell.linked(cell.neighbors.south) ? '   ' : '---');
        let corner  = '+';
        bottom += southBoundry + corner;
      });
      output += top + '\n';
      output += bottom + '\n';

    });
    return output;
  }
}

module.exports = BinaryTree;