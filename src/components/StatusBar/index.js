import React from 'react';

import './styles.css';

const StatusBar = (props) => {
  return (
    <div style={props.styles} className='status-bar'>
      <p>status: {props.session.status}</p>
    </div>
  );
};

export default StatusBar;
