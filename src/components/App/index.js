import React from 'react';
import Grid from '../Grid';

import StatusBar from '../StatusBar';
import PlayerList from '../../containers/playersList';
import DevTools from '../../containers/devtools';
import Header from '../Header';
import Overlay from '../../containers/overlay';

// import './styles.css';

class App extends React.Component {
  componentDidMount () {
    this.props.socketConnect();
  }

  _getHeaderMessage () {
    // debugger;
    if (this.props.player.wonCurrentRound) {
      return 'you completed the maze! now we wait';
    // } else if () {
    //   return `waiting for next round to start`;
    } else {
      return `move!`;
    }
  }

  _renderApp () {
    return (
      <React.Fragment>
        <StatusBar {...this.props.session} />
        <DevTools />
        {/* <Overlay /> */}
        <Header message={this._getHeaderMessage()} />
        <div className='grid-wrapper'>
          <PlayerList />
          <Grid {...this.props} />
        </div>
      </React.Fragment>
    );
  }

  render () {
    return (
      <div className='grid-container'>
        {
          this.props.session.status === 'connected' &&
          this._renderApp()
        }

        {this.props.session.status !== 'connected' &&
          <p>whoops somethign is wrong</p>
        }
      </div>
    );
  }
}

export default App;
