import React from 'react';

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
  }

  toggleDevTools () {
    this.setState({
      enabled: !this.state.enabled
    });
  }

  transitionTo (state) {
    console.log(this.props);
    const currState = this.props.session.state;
    const currStateIndex = this.state.possibleStates.indexOf(currState);
    const numOfPossibleStates = this.state.possibleStates.length;
    console.log('wasd');
    let nextStateIndex = currStateIndex + 1;

    const timer = setInterval(() => {
      console.log(nextStateIndex, this.state.possibleStates.length - 1);
      if (nextStateIndex > this.state.possibleStates.length - 1) {
        nextStateIndex = 0;
      } else {
        nextStateIndex += 1;
      }

      console.log(nextStateIndex);
      if (this.state.possibleStates[nextStateIndex] === currState) {
        clearInterval(timer);
        this.props.transitionTo(this.state.possibleStates[nextStateIndex]);
      } else {
        this.props.transitionTo(this.state.possibleStates[nextStateIndex]);
        console.log('nope', nextStateIndex, currStateIndex);
      }
    }, 500);

  }

  _renderDevTools () {
    return (
      <div>
        <p>I'm the DevTools component from Dev</p>
        <GameStates transitionTo={this.transitionTo} possibleStates={this.state.possibleStates} />
      </div>
    );
  }

  render () {
    return (
      <div className={`devtools ${this.state.enabled ? 'enabled' : ''}`}>
        <button onClick={this.toggleDevTools}> Toggle Dev Tools </button>
        {this.state.enabled && this._renderDevTools()}
      </div>
    );
  }
}

export default DevTools;
