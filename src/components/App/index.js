import React, {PropTypes} from 'react';
import Grid from '../grid';

class App extends React.Component {
  render () {
    return (
      <div>
        <Grid player={this.props.player} playerMove={this.props.playerMove} />
      </div>
    );
  }
}

App.propTypes = {
  player: React.PropTypes.any,
  playerMove: PropTypes.any
};

export default App;
