import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import GameStates from './GameStates';

import './styles.css';

class DevTools extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      enabled: true,
      possibleStates: ['intermission', 'starting', 'started', 'finishing', 'finished']
    };

    this.toggleDevTools = this.toggleDevTools.bind(this);
    this.transitionTo = this.transitionTo.bind(this);
    this.setHeartBeat = this.setHeartBeat.bind(this);
  }

  toggleDevTools () {
    this.setState({
      enabled: !this.state.enabled
    });
  }

  transitionTo (desiredState) {
    const {possibleStates} = this.state;
    let nextState;

    let timer = setInterval(() => {
      let currState = this.props.session.state;
      let currStateIndex = possibleStates.indexOf(currState);
      nextState = currStateIndex === possibleStates.length ? possibleStates[0] : possibleStates[currStateIndex + 1];

      if (this.props.session.state !== desiredState) {
        console.log('if', this.props.session.state, desiredState);
        this.props.transitionTo(nextState);
      } else {
        console.log('else', this.props.session.state);
        clearInterval(timer);
      }
    }, 1000);
  }

  setHeartBeat (state) {
    this.props.setHeartBeat(state);
  }

  _renderDevToolsControls () {
    return (
      <div className='controls'>
        <GameStates transitionTo={this.transitionTo} possibleStates={this.state.possibleStates} currentState={this.props.session.state} />
        <hr />
        <div className='controls-group'>
          <div className={className('button', {'active': this.props.session.heartbeat})} onClick={() => this.setHeartBeat(true)}>Heartbeat: on</div>
          <div className={className('button', {'active': !this.props.session.heartbeat})} onClick={() => this.setHeartBeat(false)}>Heartbeat: off</div>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className={`devtools ${this.state.enabled ? 'enabled' : ''}`}>
        <button onClick={this.toggleDevTools}> Toggle Dev Tools </button>
        {this.state.enabled && this._renderDevToolsControls()}
      </div>
    );
  }
}

DevTools.propTypes = {
  setHeartBeat: PropTypes.func,
  transitionTo: PropTypes.func,
  session: PropTypes.object
};

export default DevTools;
