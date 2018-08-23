import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Player from './Player';
import PersonalInfo from './PersonalInfo';

class PlayerList extends Component {
  _getOwnScore (id) {
    const ownPlayer = this.props.players[id];
    if (ownPlayer) {
      return ownPlayer.currentScore;
    } else {
      return null;
    }
  }

  render () {
    const playerIds = Object.keys(this.props.players || {});
    return (
      <div>
        <PersonalInfo username={this.props.player.username} score={this._getOwnScore(this.props.player.id)} />
        <div>
          <h3>
            Scoreboard
          </h3>
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
      </div>
    );
  }
}

PlayerList.propTypes = {
  player: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.string
  }),
  players: PropTypes.object
};

export default PlayerList;
