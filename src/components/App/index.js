import React from 'react';
import Grid from '../Grid';

import StatusBar from '../StatusBar';
import PlayerList from '../PlayerList';

import './styles.css';

class App extends React.Component {
  componentDidMount () {
    this.props.socketConnect();
  }

  render () {
    return (
      <div className='grid-container'>
        <StatusBar {...this.props} />
        <PlayerList />
        <Grid {...this.props} />
      </div>
    );
  }
}

export default App;
