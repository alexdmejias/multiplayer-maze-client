import React from 'react';

import './styles.css';

const StatusBar = (props) => {
  return (
    <div style={props.styles} className='status-bar'>
      <ul>
        <li>status: {props.session.status} | </li>
        <li>hearbeat: {props.session.heartbeat ? 'true' : 'false'}</li>
      </ul>
    </div>
  );
};

export default StatusBar;
