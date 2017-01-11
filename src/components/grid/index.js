import React, {Component, PropTypes} from 'react';
import {HotKeys} from 'react-hotkeys';
import classNames from 'classnames';

import GridClass from '../../common/Grid';
import algos from '../../common/algos';

import Cell from '../cell';

import './styles.css';

class Grid extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visitedCells: this.cellsToClasses(this.props.player.visitedCells),
      lastVisitedCells: this.props.player.lastVisitedCells,
      finish: '0-9'
    };

    this.keyMap = {
      'north': ['up', 'w'],
      'south': ['down', 's'],
      'west': ['left', 'a'],
      'east': ['right', 'd']
    };

    this.handlers = {
      'north': () => { this.handleMove('north'); },
      'south': () => { this.handleMove('south'); },
      'east': () => { this.handleMove('east'); },
      'west': () => { this.handleMove('west'); }
    };

    const grid = new GridClass(10, 10);

    this.preparedGrid = this.prepareGrid(grid);
  }

  // COPIED
  cellsToClasses (arr) {
    return arr.map((curr) => curr.join('-'));
  }

  // COPIED
  getLastItem (arr) {
    return arr[arr.legth - 1];
  }

  prepareGrid (grid) {
    const size = 50;
    grid = algos.binary(grid, size);

    const distances = grid.getDistances(grid.getCell(9, 0));

    for (let d in distances.cells) {
      const p = d.split('-');
      const cell = grid.getCell(...p);
      cell.setDistance(distances.cells[d]);
    }

    return grid;
  }

  // COPIED
  componentWillReceiveProps (props) {
    this.setState({
      visitedCells: this.cellsToClasses(props.player.visitedCells),
      lastVisitedCells: props.player.lastVisitedCells
    });
  }

  // COPIED
  componentDidMount () {
    this.setState({
      showBorders: true
    });

    this.props.playerMove([9, 0]);
  }

  // COPIED
  renderGrid () {
    const grid = this.preparedGrid;
    const elems = [];

    grid.eachRow().forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const key = cell.id;
        const styleProps = cell.position;

        const neighborClasses = {
          'b-e': !cell.isLinked(cell.neighbors.east),
          'b-s': !cell.isLinked(cell.neighbors.south),
          'visited': this.state.visitedCells.indexOf(key) > -1,
          'current': this.state.lastVisitedCells ? this.state.lastVisitedCells.join('-') === key : ''
        };

        elems.push(
          <Cell distance={cell.distance} key={key} classes={classNames('cell', neighborClasses)} styles={styleProps} />
        );
      });
    });

    return elems.map((curr) => curr);
  }
  
  // COPIED
  handleMove (direction) {
    const currPos = this.props.player.lastVisitedCells;
    const currCell = this.preparedGrid.grid[currPos[0]][currPos[1]];
    const possibleNeighbor = currCell.neighbors[direction];

    if (possibleNeighbor && currCell.isLinked(possibleNeighbor)) {
      this.props.playerMove([possibleNeighbor.row, possibleNeighbor.column]);
    }

    console.log(this.props.player.lastVisitedCells);
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
  playerMove: PropTypes.func
};

export default Grid;
