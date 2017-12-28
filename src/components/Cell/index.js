import React from 'react';

import './styles.css';

const Cell = (props) => {
  return (
    <div className={props.classes}>
      <small>{props.distance || 0}</small>
    </div>
  );
};

export default Cell;
