import React from 'react';

class UserDetails extends React.Component {
  showDetails() {
    if (this.props.details) {
      return <h1>{this.props.details}<span onClick={this.props.onClose.bind(this)}>x</span></h1>;
    }
  }

  render() {
    return <div>{this.showDetails()}</div>
  }
}

export default UserDetails;