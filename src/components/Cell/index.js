import React from 'react';

import './styles.css';

const Cell = (props) => {
  return (
    <div style={props.styles} className={props.classes}>
      <small>{props.distance || 0}</small>
    </div>
  );
};

export default Cell;
