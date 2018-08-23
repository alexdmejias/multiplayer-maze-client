import PropTypes from 'prop-types';

export const sessionReducerPropTypes = PropTypes.shape({
  username: PropTypes.string,
  gameState: PropTypes.string,
  id: PropTypes.string,
  status: PropTypes.string
});

export const playerReducerPropTypes = PropTypes.shape({
  wonCurrentRound: PropTypes.bool
});
