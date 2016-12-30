import React from 'react';

const Cell = (props) => {
  return (
    <div style={props.styles} className={props.classes}>
      <small>{props.distance || -1}</small>
    </div>
  )
};

export default Cell;
