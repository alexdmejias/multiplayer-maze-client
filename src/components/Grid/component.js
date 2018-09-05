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
    };

    this.keyMap = config.keyMap;

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
    } else {
      console.log('alexalex - |||||||||', 'returning');
      preparedMaze = this.state.maze;
    }

    return preparedMaze;
  }

  // componentWillReceiveProps (props) { //TODO: getting deprecated
  //   console.log('alexalex - @@@@@@', 'componentWillReceiveProps', props);
  //   let mazeLength;
  //   if (this.state.maze) {
  //     mazeLength = this.state.maze.indexOf('|');
  //   //   // this.state.preparedMaze = createGrid(mazeLength, mazeLength);
  //   //   // setupGridNeighbors(this.state.preparedMaze);

  //   //   // this.setupGridLinks(this.state.preparedMaze, props.session.maze);

  //     this.setState({
  //       visitedCells: cellsToClasses(props.player.visitedCells),
  //       lastVisitedCells: props.player.lastVisitedCells,
  //       mazeLength
  //     });
  //   }
  // }

  componentDidMount () {
    this.props.playerMoved(this.state.start);
  }

  handleMove (direction) {
    if (this.props.player.movementAllowed) {
      const {visitedCells} = this.props.player;
      const currPos = visitedCells[visitedCells.length - 1];
      const possibleNeighbor = isNeighbor(currPos, direction, this.state.maze);

      // can the player go to the the linked cell?
      if (possibleNeighbor && isLink(getId(currPos[0], currPos[2]), possibleNeighbor.id, this.state.maze)) {
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

    if (this.state.lastProcessedId !== propsMazeId) {
      this.setState({
        lastProcessedId: propsMazeId,
        maze: this.setupMaze(propsMaze)
      });
    }
  }

  renderGrid () {
    console.log('alexalex - ----------', this.props.player);
    if (this.state.maze) {
      const elems = [];
      const {visitedCells} = this.props.player;
      const currentCell = visitedCells[visitedCells.length - 1];

      return this.state.maze.map((row) => {
        return (
          <div className='row'>
            {this.renderRow(row, visitedCells, currentCell)}
          </div>
        );
      });
    }
  }

  renderRow(row, visitedCells, currentCell) {
    return row.map((cell) => {
      if (cell.id === '9-0' || cell.id === '9-1') {
        // debugger;
      }
      const neighborClasses = {
        'b-e': cell.neighbors.east ? !isLink(cell, cell.neighbors.east.id, this.state.maze) : false,
        'b-s': cell.neighbors.south ? !isLink(cell, cell.neighbors.south.id, this.state.maze) : false,
        'visited': visitedCells.indexOf(cell.id) > -1,
        'current': currentCell ? currentCell === cell.id : '',
        'finish': isEqual(this.state.finish.join('-'), cell.id)
      };

      if (cell.id === '9-0' || cell.id === '9-1') {
        // debugger;
      }

      return <Cell distance={`${cell.connectionTypes} --- ${cell.id}`} key={cell.id} classes={classNames('cell', neighborClasses)} />
    });
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
