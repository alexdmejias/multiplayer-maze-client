import React from 'react';

class Indicator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<h1>currently: {this.props.connectionStatus}</h1>);
  }
}

export default Indicator;