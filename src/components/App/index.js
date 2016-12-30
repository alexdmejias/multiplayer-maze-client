import React from 'react';
import BinaryTree from '../binary-tree';

class App extends React.Component {
  render () {
    return (
      <div>
        <BinaryTree player={this.props.player} playerMove={this.props.playerMove} />
      </div>
    );
  }
}

export default App;