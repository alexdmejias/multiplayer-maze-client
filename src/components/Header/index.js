import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ wonCurrentRound, gameState }) => {
  let message = '';

  if (gameState === 'waiting') {
    message = 'waiting for next round to begin';
  } else {
    if (wonCurrentRound) {
      message = 'you completed the round, now wait'
    } else {
      message = 'move!';
    }
  }

  return (
    <h1>
      {message}
    </h1>
  );
};

Header.propTypes = {
  wonCurrentRound: PropTypes.bool,
  gameState: PropTypes.string
};

export default Header;
