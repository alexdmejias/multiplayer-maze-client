import React from 'react';

class Indicator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    
    return (<h1>I am the indicator, {this.props.connectionStatus}</h1>);
  }
}

export default Indicator;