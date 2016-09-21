import React, { PropTypes } from 'react';
import styles from './styles';

const Cell = (props) => {
  const { x, y, width, height, north, south, east, west } = props;

  return (
    <svg
      style={_.assign({}, styles.root, { top: `${y}px`, left: `${x}px` })}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1={0}
        y1={0}
        x2={0 + width}
        y2={0}
        strokeWidth="1"
        stroke={north ? 'black' : 'white'}
      />
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={0 + height}
        strokeWidth="1"
        stroke={west ? 'black' : 'white'}
      />
      <line
        x1={0}
        y1={0 + height}
        x2={0 + width}
        y2={0 + height}
        strokeWidth="1"
        stroke={south ? 'black' : 'white'}
      />
      <line
        x1={0 + width}
        y1={0}
        x2={0 + width}
        y2={0 + height}
        strokeWidth="1"
        stroke={east ? 'black' : 'white'}
      />
    </svg>
  );
};

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  north: PropTypes.bool.isRequired,
  south: PropTypes.bool.isRequired,
  east: PropTypes.bool.isRequired,
  west: PropTypes.bool.isRequired
};

export default Cell;
