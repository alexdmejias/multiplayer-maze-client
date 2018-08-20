import React from 'react';

const Player = (props) => {
  return (
    <p>{props.username} - {props.currentScore}</p>
  );
};

export default Player;
