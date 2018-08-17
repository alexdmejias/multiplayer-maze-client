import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Overlay extends Component {
  constructor (props) {
    super(props);
    this._handleConfirmPress = this._handleConfirmPress.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);

    this.state = {
      currentUsername: this.props.username
    };
  }

  _handleConfirmPress () {
    // todo some form validation
    this.props.setOverlay();
  }

  _handleKeyUp (event) {
    const value = event.target;

    if (value.length > 1) {
      this.setState({
        currentUsername: value
      })
    }
  }

  _renderOverlay () {
    return (
      <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'black'}}>
        <input type="text" value={this.state.currentUsername} onKeyUp={this._handleKeyUp} />
        <button onClick={this._handleConfirmPress}> confirm</button>
      </div>
    );
  }
  render () {
    if (!this.props.showOverlay) {
      return null;
    } else {
      return this._renderOverlay();
    }
  }
}

Overlay.propTypes = {
  username: PropTypes.string,
  showOverlay: PropTypes.bool,
  setOverlay: PropTypes.func
};

export default Overlay;
