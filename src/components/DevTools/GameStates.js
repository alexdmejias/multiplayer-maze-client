import React from 'react';

class GameStates extends React.Component {
  constructor (props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick (state) {
    console.log(':WASD');
    this.props.transitionTo(state);
  }

  _renderButton (state) {
    return (<button onClick={() => this._handleClick(state)}>{state}</button>);
  }

  render () {
    return (
      <div>
        {this.props.possibleStates.map((currState) => this._renderButton(currState))};
      </div>
    );
  }
}

export default GameStates;
