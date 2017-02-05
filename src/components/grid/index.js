import React, {Component, PropTypes} from 'react';
import {HotKeys} from 'react-hotkeys';
import classNames from 'classnames';
import {isEqual} from 'lodash';

import config from '../../config';

import Cell from '../Cell';

import './styles.css';

class Grid extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visitedCells: this.cellsToClasses(this.props.player.visitedCells),
      lastVisitedCells: this.props.player.lastVisitedCells,
      finish: [0, 9],
      start: [9, 0],
      sampleMaze: '3333333331|6566655662|6666556652|5655566662|6655556652|5565666552|5566566652|6566656662|5655566652|6556566662|'
    };

    this.links = {};

    this.keyMap = config.keyMap;

    this.handlers = {
      'north': () => { this.handleMove('north'); },
      'south': () => { this.handleMove('south'); },
      'east': () => { this.handleMove('east'); },
      'west': () => { this.handleMove('west'); }
    };

    this.preparedGrid = this.createGrid(this.state.sampleMaze);
    this.setupGridNeighbors(this.preparedGrid);
    this.setupGridLinks(this.preparedGrid);
  }

  /**
   *
   *
   * @param {any} arr
   * @returns
   *
   * @memberOf Grid
   */
  cellsToClasses (arr) {
    return arr.map((curr) => curr.join('-'));
  }

  getLastItem (arr) {
    return arr[arr.legth - 1];
  }

  /**
   * Compares the positions (row, column) of cells A and B
   *
   * @param {any} cellA Cell
   * @param {any} cellB Cell
   *
   * @memberOf Grid
   */
  compareCellPositions (cellA, cellB) {
    return cellA.row === cellB.row && cellA.column === cellB.column;
  }

  /**
   *
   *
   * @param {any} row
   * @param {any} column
   * @returns
   *
   * @memberOf Grid
   */
  getId (row, column) {
    return `${row}-${column}`;
  }

  /**
   * Determines whether there is a link between the two given Cells
   *
   * @param {any} fromCell
   * @param {any} toCellId
   * @returns
   *
   * @memberOf Grid
   */
  isLink (fromCell, toCellId) {
    let cell;
    if (typeof fromCell === 'string') {
      cell = this.getCell(fromCell);
    } else {
      cell = fromCell;
    }

    return cell.links[toCellId];
  }

  /**
   *
   *
   * @param {any} cellId
   * @returns
   *
   * @memberOf Grid
   */
  getCell (cellId) {
    let parts = cellId;

    if (typeof cellId === 'string') {
      parts = cellId.split('-');
    }
    return this.preparedGrid[parts[0]][parts[1]];
  }

  /**
   *
   *
   * @param {any} fromCell
   * @param {any} direction
   * @returns
   *
   * @memberOf Grid
   */
  isNeighbor (fromCell, direction) {
    const cell = this.getCell(fromCell);
    return cell.neighbors[direction];
  }

  createGrid (connectionTypes) {
    const grid = [];
    const wasd = connectionTypes.split('|');
    wasd.pop(); // removes the last '|'
    wasd.forEach((curr, rowIndex) => {
      const row = [];
      const currConnectionTypes = curr.split('');
      currConnectionTypes.forEach((currA, columnIndex) => {
        const cell = {
          id: `${rowIndex}-${columnIndex}`,
          rowIndex,
          columnIndex,
          position: {
            top: rowIndex * 50,
            left: columnIndex * 50
          },
          connectionTypes: currA,
          links: {}
        };

        row.push(cell);
      });
      grid.push(row);
    });

    return grid;
  }

  setupGridNeighbors (grid) {
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
  }

  setupGridLinks (grid) {
    grid.forEach((row, rowIndex) => {
      row.forEach((currentCell, columnIndex) => {
        // 1 no link no neighbor
        // 2 link to north
        // 3 link to east
        // 5 link to north neighbor to east
        // 6 link to east neighbor north
        const neighborLinkType = parseInt(currentCell.connectionTypes);

        let neighborCell;
        if (neighborLinkType === 2 || neighborLinkType === 5) {
          neighborCell = grid[rowIndex - 1][columnIndex];
        } else if (neighborLinkType === 3 || neighborLinkType === 6) {
          neighborCell = grid[rowIndex][columnIndex + 1];
        }

        if (neighborCell) {
          currentCell.links[neighborCell.id] = neighborCell;
          neighborCell.links[currentCell.id] = currentCell;
        }
      });
    });
  }

  componentWillReceiveProps (props) {
    this.setState({
      visitedCells: this.cellsToClasses(props.player.visitedCells),
      lastVisitedCells: props.player.lastVisitedCells
    });
  }

  componentDidMount () {
    this.setState({
      showBorders: true
    });

    this.props.playerMoved([9, 0]);
  }

  renderGrid () {
    const elems = [];

    this.preparedGrid.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const currentCell = this.state.lastVisitedCells;
        const neighborClasses = {
          'b-e': cell.neighbors.east ? !this.isLink(cell, cell.neighbors.east.id) : false,
          'b-s': cell.neighbors.south ? !this.isLink(cell, cell.neighbors.south.id) : false,
          'visited': this.state.visitedCells.indexOf(cell.id) > -1,
          'current': currentCell ? currentCell.join('-') === cell.id : '',
          'finish': isEqual(this.state.finish.join('-'), cell.id)
        };

        elems.push(
          <Cell distance={cell.connectionTypes} key={cell.id} classes={classNames('cell', neighborClasses)} styles={cell.position} />
        );
      });
    });

    return elems.map((curr) => curr);
  }

  handleMove (direction) {
    const currPos = this.props.player.lastVisitedCells;
    const possibleNeighbor = this.isNeighbor(currPos, direction);

    // // can the player go to the the linked cell?
    if (possibleNeighbor && this.isLink(this.getId(...currPos), possibleNeighbor.id)) {
      this.props.playerMoved([possibleNeighbor.rowIndex, possibleNeighbor.columnIndex]);
      if (isEqual(this.state.finish, [possibleNeighbor.rowIndex, possibleNeighbor.columnIndex])) {
        console.log('you are at the finish line');
        this.props.playerScored();
      }
    }
  }

  render () {
    return (
      <HotKeys keyMap={this.keyMap} handlers={this.handlers}>
        <div className={classNames('maze', {'green': this.state.showBorders})}>
          { this.renderGrid() }
        </div>
      </HotKeys>
    );
  }
}

Grid.propTypes = {
  player: PropTypes.shape({
    lastVisitedCells: PropTypes.array,
    visitedCells: PropTypes.array
  }),
  playerMoved: PropTypes.func,
  playerScored: PropTypes.func
};

export default Grid;
