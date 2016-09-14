import React, {Component} from 'react';

class UserList extends Component {
  getUsers() {
    return this.props.users.map((user) => {
      return (
        <li key={Math.random()} onClick={() => this.props.onUserClick(user)}>
        {user}
        </li>
      );
    });
  }
  
  render() {
    return (
      <ul>
        {this.getUsers()}
      </ul>
    );
  }
}

export default UserList;