import React, {Component, PropTypes} from 'react';
import {HotKeys} from 'react-hotkeys';
import classNames from 'classnames';
import {isEqual} from 'lodash';

import config from '../../config';
import GridClass from '../../common/Grid';
import algos from '../../common/algos';

import Cell from '../Cell';

import './styles.css';

class Grid extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visitedCells: this.cellsToClasses(this.props.player.visitedCells),
      lastVisitedCells: this.props.player.lastVisitedCells,
      finish: [0, 9],
      start: [9, 0]
    };

    this.keyMap = config.keyMap;

    this.handlers = {
      'north': () => { this.handleMove('north'); },
      'south': () => { this.handleMove('south'); },
      'east': () => { this.handleMove('east'); },
      'west': () => { this.handleMove('west'); }
    };

    const grid = new GridClass(config.grid.width, config.grid.height);

    this.preparedGrid = this.prepareGrid(grid);
  }

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

  prepareGrid (grid) {
    const size = 50;
    grid = algos.binary(grid, size);

    const distances = grid.getDistances(grid.getCell(9, 0));

    for (let d in distances.cells) {
      const position = d.split('-');
      const cell = grid.getCell(...position);
      cell.setDistance(distances.cells[d]);
    }

    return grid;
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
    const grid = this.preparedGrid;
    const elems = [];

    grid.eachRow().forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const key = cell.id;
        const styleProps = cell.position;
        const currentCell = this.state.lastVisitedCells;

        const neighborClasses = {
          'b-e': !cell.isLinked(cell.neighbors.east),
          'b-s': !cell.isLinked(cell.neighbors.south),
          'visited': this.state.visitedCells.indexOf(key) > -1,
          'current': currentCell ? currentCell.join('-') === key : '',
          'finish': isEqual(this.state.finish.join('-'), key)
        };

        elems.push(
          <Cell distance={cell.distance} key={key} classes={classNames('cell', neighborClasses)} styles={styleProps} />
        );
      });
    });

    return elems.map((curr) => curr);
  }

  handleMove (direction) {
    const currPos = this.props.player.lastVisitedCells;
    const currCell = this.preparedGrid.grid[currPos[0]][currPos[1]];
    const possibleNeighbor = currCell.neighbors[direction];

    // can the player go to the the linked cell?
    if (possibleNeighbor && currCell.isLinked(possibleNeighbor)) {
      this.props.playerMoved([possibleNeighbor.row, possibleNeighbor.column]);

      if (isEqual(this.state.finish, [possibleNeighbor.row, possibleNeighbor.column])) {
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
