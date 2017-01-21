export default (grid, size) => {
  grid.grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      let neighbors = [];

      if (cell.neighbors.north) {
        neighbors.push(cell.neighbors.north);
      }

      if (cell.neighbors.east) {
        neighbors.push(cell.neighbors.east);
      }

      let index = Math.floor(Math.random() * neighbors.length);
      let neighbor = neighbors[index];

      if (neighbor) {
        cell.setLink(neighbor);
      }

      cell.position = {
        top: (cell.row * size),
        left: (cell.column * size)
      };
    });
  });

  return grid;
};
