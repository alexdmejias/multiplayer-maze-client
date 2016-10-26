import React, {Component} from 'react';
import {HotKeys} from 'react-hotkeys';
import CellClass from '../../common/Cell';
import GridClass from '../../common/Grid';

import './styles.css';
import classNames from 'classnames';

class BinaryTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitedCells: this.cellsToClasses(this.props.player.visitedCells),
      lastVisitedCells: this.props.player.lastVisitedCells
    };

    this.keyMap = {
      'north': ['up', 'w'],
      'south': ['down', 's'],
      'west': ['left', 'a'],
      'east': ['right', 'd']
    };

    const grid = new GridClass(10, 10);
    this.preparedGrid = this.prepareGrid(grid);
  }

  cellsToClasses(arr) {
    return arr.map((curr) => curr.join('-'));
  }

  getLastItem(arr) {
    return arr[arr.legth - 1];
  }

  prepareGrid(grid) {
    console.warn(grid)
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

  componentWillReceiveProps(props) {
    console.log('new props', props)
    this.setState({
      visitedCells: this.cellsToClasses(props.player.visitedCells),
      lastVisitedCells: props.player.lastVisitedCells 
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showBorders: true
      });
    }, 1000);
  }

  renderGrid() {
    const grid = this.preparedGrid;
    const elems = [];
    const size = 50;

    grid.eachRow().forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const key = `${rowIndex}-${cellIndex}`;
        const rectProps = {
          top: (cell.row * size),
          left: (cell.column * size)
        };

        const neighborClasses = {
          'b-e': cell.linked(cell.neighbors.east) || !cell.neighbors.east,
          'b-s': cell.linked(cell.neighbors.south) || !cell.neighbors.south,
          'b-t': !cell.neighbors.north, 
          'b-w': !cell.neighbors.west, 
          'visited': this.state.visitedCells.indexOf(key) > -1,
          'current': this.state.lastVisitedCells.join('-') === key
        };

        elems.push( <div key={key} className={classNames('cell', neighborClasses)} style={rectProps} > </div> );
      });
    });

    return elems.map((curr) => curr);
  }
  
  handleMove(direction) {
    const currPos = this.props.player.lastVisitedCells;
    const currCell = this.preparedGrid.grid[currPos[0]][currPos[1]];
    const possibleNeighbor = currCell.neighbors[direction];

    if (possibleNeighbor && !currCell.linked(possibleNeighbor)) {
      this.props.playerMove([possibleNeighbor.row, possibleNeighbor.column]);
    }
  }
  
  render() {

    const handlers = {
      'north': () => { this.handleMove('north')},
      'south': () => { this.handleMove('south')},
      'east' : () => { this.handleMove('east')},
      'west' : () => { this.handleMove('west')}
    };

    return (
      <HotKeys keyMap={this.keyMap} handlers={handlers}>
        <div className={classNames('maze', {'green': this.state.showBorders})}>
          { this.renderGrid() }
        </div>
      </HotKeys>
    )
  }
}

export default BinaryTree;