import React, {Component} from 'react';

class UserList extends Component {
  getUsers() {
    return this.props.users.map((user) => {
      return (<li key={Math.random()}>{user}</li>)
    });
  }
  
  render() {
    console.log('these are my props', this.props);
    return (
      <ul>
        {this.getUsers()}
      </ul>
    );
  }
}

export default UserList;