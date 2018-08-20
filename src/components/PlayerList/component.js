import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Player from '../Player';

class PlayerList extends Component {
  render () {
    const playerIds = Object.keys(this.props.players || {});
    return (
      <div>
        Players
        <ul>
          {
            playerIds.length > 0 &&
            playerIds.map((curr) => {
              const props = this.props.players[curr];
              return <li key={curr}> <Player {...props} /> </li>
            })
          }
        </ul>
      </div>
    );
  }
}

PlayerList.propTypes = {
  players: PropTypes.object
};

export default PlayerList;
