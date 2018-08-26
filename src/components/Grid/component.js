import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {HotKeys} from 'react-hotkeys';
import classNames from 'classnames';
import {isEqual} from 'lodash';

import config from '../../config';

import {
  createGrid,
  setupGridNeighbors,
  setupGridLinks,
  // getCell,
  cellsToClasses,
  isNeighbor,
  isLink,
  getId
} from '../../utils/maze';

import Cell from '../Cell';

import './styles.css';

class Grid extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visitedCells: cellsToClasses(this.props.player.visitedCells),
      lastVisitedCells: this.props.player.lastVisitedCells,
      finish: [0, 9],
      start: [9, 0],
      mazeLength: 10,
      cellLength: 50,
      showBorders: true
      // maze: ''
    };

    // this.lastProcessedId = '';

    this.links = {};

    this.keyMap = config.keyMap;
    this.hasPrevMaze = false;

    this.handlers = {
      'north': () => { this.handleMove('north'); },
      'south': () => { this.handleMove('south'); },
      'east': () => { this.handleMove('east'); },
      'west': () => { this.handleMove('west'); }
    };
  }

  generateMazeId (mazeAsString) {
    return mazeAsString.slice(0, 20);
  }

  setupMaze (mazeAsString) {
    console.log('alexalex - |||||||||', 'processing');
    const newMazeId = this.generateMazeId(mazeAsString);
    let preparedMaze;
    if (this.state.lastProcessedId !== newMazeId) {
      console.log('alexalex - |||||||||', 'creating');
      preparedMaze = createGrid(10, 10);
      preparedMaze = setupGridNeighbors(preparedMaze);
      preparedMaze = setupGridLinks(preparedMaze, mazeAsString);
      // this.lastProcessedId = newMazeId;
      // this.maze = preparedMaze;
    } else {
      console.log('alexalex - |||||||||', 'returning');
      preparedMaze = this.state.maze;
    }

    return preparedMaze;
  }

  setupGridLinks (grid, connectionTypes) {
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
  }

  componentWillReceiveProps (props) { //TODO: getting deprecated
    console.log('alexalex - @@@@@@', 'componentWillReceiveProps', props);
    let mazeLength;
    // if (this.state.maze) {
    //   mazeLength = this.state.maze.indexOf('|');
    //   // this.state.preparedMaze = createGrid(mazeLength, mazeLength);
    //   // setupGridNeighbors(this.state.preparedMaze);

    //   // this.setupGridLinks(this.state.preparedMaze, props.session.maze);

    //   this.setState({
    //     visitedCells: cellsToClasses(props.player.visitedCells),
    //     lastVisitedCells: props.player.lastVisitedCells,
    //     mazeLength
    //   });
    // }
  }

  componentDidMount () {
    this.props.playerMoved(this.state.start);
  }

  handleMove (direction) {
    if (this.props.player.movementAllowed) {
      const currPos = this.props.player.lastVisitedCells;
      const possibleNeighbor = isNeighbor(currPos, direction, this.state.preparedMaze);

      // can the player go to the the linked cell?
      if (possibleNeighbor && isLink(getId(currPos[0], currPos[1]), possibleNeighbor.id, this.state.preparedMaze)) {
        this.props.playerMoved([possibleNeighbor.rowIndex, possibleNeighbor.columnIndex]);
        if (isEqual(this.state.finish, [possibleNeighbor.rowIndex, possibleNeighbor.columnIndex])) {
          console.log('you are at the finish line');
          this.props.playerScored();
        }
      }
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const propsMaze = this.props.session.maze;
    const propsMazeId = this.generateMazeId(propsMaze);
    const prevMaze = prevProps.session.maze;
    console.log('alexalex - ----------componentDidUpdate', this.state.lastProcessedId, propsMazeId);
    if (this.state.lastProcessedId !== propsMazeId) {
      console.log('alexalex - ----------', 'if', this.generateMazeId(prevMaze), propsMazeId);
      this.setState({
        lastProcessedId: propsMazeId,
        maze: this.setupMaze(propsMaze)
      });
    } else {
      console.log('alexalex - ----------', 'else');
      // debugger;
    }
  }

  renderGrid () {
    if (this.state.maze) {
      const elems = [];

      this.state.maze.forEach((row) => {
        row.forEach((cell, columnIndex) => {
          const currentCell = this.state.lastVisitedCells;
          const neighborClasses = {
            'b-e': cell.neighbors.east ? !isLink(cell, cell.neighbors.east.id, this.state.maze) : false,
            'b-s': cell.neighbors.south ? !isLink(cell, cell.neighbors.south.id, this.state.maze) : false,
            'visited': this.state.visitedCells.indexOf(cell.id) > -1,
            'current': currentCell ? currentCell.join('-') === cell.id : '',
            'finish': isEqual(this.state.finish.join('-'), cell.id)
          };

          elems.push(
            <Cell distance={`${cell.connectionTypes}   ${cell.id}`} key={cell.id} classes={classNames('cell', neighborClasses)} />
          );
        });
      });

      return elems.map((curr) => curr);
    }
  }

  render () {
    console.log('alexalex - ----------', 'rendering grid :/'); // TODO: can this be stopped?
    const size = this.state.mazeLength * this.state.cellLength;
    if (!this.state.mazeLength || !this.state.cellLength) {
      // debugger;
    }

    // TODO move this loading indicator to a seperate component
    const loadingStyles = {
      background: 'black',
      opacity: 0,
      transition: 'opacity 300ms',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    if (this.props.session.gameState === 'waiting') {
      loadingStyles.opacity = 0.75;
    }

    return (
      <HotKeys keyMap={this.keyMap} handlers={this.handlers}>
        <div style={{position: 'relative'}}>
          <div className={'fill'} style={loadingStyles}>
            <p style={{color: 'white'}}>Waiting for next round to begin</p>
          </div>
          <div style={{width: size, height: size}} className={classNames('grid', {'green': this.state.showBorders})}>
            {this.renderGrid()}
          </div>
        </div>
      </HotKeys>
    );
  }
}

Grid.propTypes = {
  player: PropTypes.shape({
    lastVisitedCells: PropTypes.array,
    visitedCells: PropTypes.array,
    movementAllowed: PropTypes.bool
  }),
  session: PropTypes.shape({
    maze: PropTypes.string,
    gameState: PropTypes.string
  }),
  playerMoved: PropTypes.func,
  playerScored: PropTypes.func
};

export default Grid;
