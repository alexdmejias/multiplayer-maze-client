import React, {Component} from 'react';

import Player from '../Player';

class PlayerList extends Component {
  constructor () {
    super();
    this.players = [
      {id: 'one', name: 'One'},
      {id: 'two', name: 'Two'}
    ];
  }

  render () {
    const players = this.players.map((currPlayer) => {
      return <li><Player {...currPlayer} /></li>;
    });
    
    return (
      <div>
        <ul>
          {players}
        </ul>
      </div>
    );
  }
}

export default PlayerList;
