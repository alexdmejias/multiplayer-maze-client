import React from 'react';
import PropTypes from 'prop-types';

class GameStates extends React.Component {
  constructor (props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick (state) {
    this.props.transitionTo(state);
  }

  _renderButton (state) {
    return (<div className={`button${this.props.currentState === state ? ' active' : ''}`} key={state} onClick={() => this._handleClick(state)}>{state}</div>);
  }

  render () {
    return (
      <div className='controls-group'>
        {this.props.possibleStates.map((currState) => this._renderButton(currState))}
      </div>
    );
  }
}

GameStates.propTypes = {
  currentState: PropTypes.string,
  possibleStates: PropTypes.arrayOf(PropTypes.string),
  transitionTo: PropTypes.func
};

export default GameStates;
