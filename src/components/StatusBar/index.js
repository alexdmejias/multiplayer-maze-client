import React from 'react';

import './styles.css';

const StatusBar = ({status, heartbeat}) => {
  return (
    <div className='status-bar'>
      <ul>
        <li>status: {status} | </li>
        <li>hearbeat: {heartbeat ? 'true' : 'false'}</li>
      </ul>
    </div>
  );
};

export default StatusBar;
