import React, {Component} from 'react';

import Player from '../Player';

class PlayerList extends Component {
  constructor () {
    super();
    this.players = [
      {id: 'one', name: 'John Doe'},
      {id: 'two', name: 'Jane Doe'}
    ];
  }

  render () {
    return (
      <div>
        <ul>
          {this.players && this.players.map((curr) => <li key={curr.id}><Player {...curr} /></li>)}
        </ul>
      </div>
    );
  }
}

export default PlayerList;
