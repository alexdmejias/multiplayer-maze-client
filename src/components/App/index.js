import React from 'react';
import Grid from '../Grid';

class App extends React.Component {
  render () {
    return (
      <div>
        <Grid {...this.props} />
      </div>
    );
  }
}

export default App;
