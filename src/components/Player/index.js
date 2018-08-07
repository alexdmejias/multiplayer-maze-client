import React from 'react';

const Player = (props) => {
  return (
    <p>{props.id} - {props.currentScore}</p>
  );
};

export default Player;
