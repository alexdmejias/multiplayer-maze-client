import React, {Component} from 'react';

import Player from '../Player';

class PlayerList extends Component {
  render () {
    const players = Object.keys(this.props.players || []);
    return (
      <div>
        <ul>
          {players.length && players.map((curr) => <li key={this.props.players[curr].id}><Player {...this.props.players[curr]} /></li>)}
        </ul>
      </div>
    );
  }
}

export default PlayerList;
