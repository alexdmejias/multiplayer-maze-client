import React from 'react';
import Grid from '../Grid';

class App extends React.Component {
  componentDidMount () {
    this.props.socketConnect();
  }

  render () {
    return (
      <div>
        <Grid {...this.props} />
      </div>
    );
  }
}

export default App;
