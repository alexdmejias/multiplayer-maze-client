import { getId, isLink, isNeighbor } from '../utils/maze';
import * as types from '../types';
import * as mazeUtils from '../utils/maze';

const KEYS = {
  '37': 'west',
  '38': 'north',
  '39': 'east',
  '40': 'south'
};

// const handleMove(direction)

let preparedMaze = '';
const rowSeparator = '|';

function processMaze (mazeAsStr) {
  const rows = mazeAsStr.split(rowSeparator);
  rows.splice(rows.length - 1);
  const emptyGrid = mazeUtils.createGrid(rows.length, rows[0].length);
  const gridWithNeighbors = mazeUtils.setupGridNeighbors(emptyGrid);
  const gridWithLinks = mazeUtils.setupGridLinks(gridWithNeighbors, mazeAsStr);
  // debugger
  return gridWithLinks;
}

const socketMiddleware = (store) => {
  return (next) => (action) => {
    if ((action.type === types.SESSION_INIT_CONNECTION) || (action.type === types.SESSION_MAZE_ARRIVAL)) {
      let newMazeRaw;
      if (action.type === types.SESSION_INIT_CONNECTION) {
        newMazeRaw = action.data.maze;
      } else {
        newMazeRaw = action.maze;
      }

      const newMaze = processMaze(newMazeRaw);
      store.dispatch({
        type: 'wasd',
        preparedMaze: newMaze
      });
    }
    const result = next(action);

    return result;
  };
};

export default socketMiddleware;
