import React from 'react';

import { playerReducerPropTypes, sessionReducerPropTypes } from '../../interfaces';
import Grid from '../Grid';
import StatusBar from '../StatusBar';
import PlayerList from '../PlayerList';
import DevTools from '../DevTools';
import Header from '../Header';
import Overlay from '../Overlay';

// import './styles.css';

class App extends React.Component {
  componentDidMount () {
    this.props.socketConnect();
  }

  _renderApp () {
    return (
      <React.Fragment>
        <StatusBar {...this.props.session} />
        <DevTools />
        {/* <Overlay /> */}
        <Header gameState={this.props.session.gameState} wonCurrentRound={this.props.player.wonCurrentRound} />
        <div className='grid-wrapper'>
          <PlayerList />
          <Grid />
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

App.propTypes = {
  session: sessionReducerPropTypes,
  player: playerReducerPropTypes
};

export default App;
