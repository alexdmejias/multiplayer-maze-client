/**
 *
 *
 * @param {any} cellId
 * @returns
 *
 * @memberOf Grid
 */
export const getCell = (preparedGrid, cellId) => {
  let parts = cellId;

  if (typeof cellId === 'string') {
    parts = cellId.split('-');
  }
  return preparedGrid[parts[0]][parts[1]]; // TODO
};

/**
 *
 *
 * @param {any} fromCell
 * @param {any} direction
 * @returns
 *
 * @memberOf Grid
 */
export const isNeighbor = (fromCell, direction, preparedGrid) => {
  const cell = getCell(preparedGrid, fromCell);
  return cell.neighbors[direction];
};

/**
 * Determines whether there is a link between the two given Cells
 *
 * @param {any} fromCell
 * @param {any} toCellId
 * @returns
 *
 * @memberOf Grid
 */
export const isLink = (fromCell, toCellId, preparedGrid) => {
  let cell;
  if (typeof fromCell === 'string') {
    cell = getCell(preparedGrid, fromCell);
  } else {
    cell = fromCell;
  }

  return cell.links[toCellId];
};

  /**
   *
   *
   * @param {any} row
   * @param {any} column
   * @returns
   *
   * @memberOf Grid
   */
export const getId = (row, column) => {
  return `${row}-${column}`;
};

/**
 *
 *
 * @param {String} connectionTypes
 * @returns Object[][]
 *
 * @memberOf Grid
 */
export const createGrid = (rowsLength, columnsLength) => {
  const grid = [];

  for (let i = 0; i < rowsLength; i++) {
    const rowIndex = i;
    const row = [];
    for (let h = 0; h < columnsLength; h++) {
      const columnIndex = h;
      const cell = {
        id: `${rowIndex}-${columnIndex}`,
        rowIndex,
        columnIndex,
        links: {}
      };

      row.push(cell);
    }
    grid.push(row);
  }

  return grid;
};

export const setupGridNeighbors = (grid) => {
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      cell.neighbors = {};

      if (grid[rowIndex - 1]) {
        cell.neighbors.north = grid[rowIndex - 1][columnIndex];
      }

      if (grid[rowIndex + 1]) {
        cell.neighbors.south = grid[rowIndex + 1][columnIndex];
      }

      if (grid[rowIndex][columnIndex + 1]) {
        cell.neighbors.east = grid[rowIndex][columnIndex + 1];
      }

      if (grid[rowIndex][columnIndex - 1]) {
        cell.neighbors.west = grid[rowIndex][columnIndex - 1];
      }
    });
  });

  return grid;
};

/**
 *
 *
 * @param {any} arr
 * @returns
 *
 * @memberOf Grid
 */
export const cellsToClasses = (arr) => {
  return arr.map((curr) => curr.join('-'));
};

/**
 * Compares the positions (row, column) of cells A and B
 *
 * @param {any} cellA Cell
 * @param {any} cellB Cell
 *
 * @memberOf Grid
 */
export const compareCellPositions = (cellA, cellB) => {
  return cellA.row === cellB.row && cellA.column === cellB.column;
};

export const setupGridLinks = (grid, connectionTypes) => {
  const wasd = connectionTypes.split('|');

  grid.forEach((row, rowIndex) => {
    const currConnectionTypes = wasd[rowIndex];
    row.forEach((currentCell, columnIndex) => {
      // 1 no link no neighbor
      // 2 link to north
      // 3 link to east
      // 5 link to north neighbor to east
      // 6 link to east neighbor north
      const neighborLinkType = parseInt(currConnectionTypes[columnIndex], 10);
      currentCell.connectionTypes = neighborLinkType;

      let neighborCell;
      if (neighborLinkType === 2 || neighborLinkType === 5) {
        neighborCell = grid[rowIndex - 1] && grid[rowIndex - 1][columnIndex] ? grid[rowIndex - 1][columnIndex] : null;
      } else if (neighborLinkType === 3 || neighborLinkType === 6) {
        neighborCell = grid[rowIndex][columnIndex + 1];
      }

      if (neighborCell) {
        currentCell.links[neighborCell.id] = neighborCell;
        neighborCell.links[currentCell.id] = currentCell;
      }
    });
  });

  return grid;
};
