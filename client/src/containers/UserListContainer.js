import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import UserList from '../components/UserList'

const mapStateToProps = (state) => {
  return {
    users: state.usersState
  }
};

const UserListContainer = connect(
  mapStateToProps
)(UserList);

export default UserListContainer