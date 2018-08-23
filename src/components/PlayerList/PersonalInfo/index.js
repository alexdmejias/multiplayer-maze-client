import React from 'react';
import PropTypes from 'prop-types';

const PersonalInfo = ({username, score}) => {
  return (
    <div>
      <h2>{username}</h2>
      <h2>Score: {score}</h2>
    </div>
  );
};

PersonalInfo.propTypes = {
  username: PropTypes.string,
  score: PropTypes.number
};

export default PersonalInfo;
