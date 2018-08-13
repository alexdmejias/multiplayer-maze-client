import React from 'react';
import Grid from '../Grid';

import StatusBar from '../StatusBar';
import PlayerList from '../../containers/playersList';
import DevTools from '../../containers/devtools';
import Header from '../Header';

// import './styles.css';

class App extends React.Component {
  componentDidMount () {
    this.props.socketConnect();
  }

  _getHeaderMessage () {
    if (this.props.player.wonCurrentRound) {
      return 'you completed the maze! now we wait';
    } else {
      return `move!`;
    }
  }

  render () {
    return (
      <div className='grid-container'>
        <StatusBar {...this.props.session} />
        <DevTools />
        <PlayerList />
        <Header message={this._getHeaderMessage()} />
        <Grid {...this.props} />
      </div>
    );
  }
}

export default App;
