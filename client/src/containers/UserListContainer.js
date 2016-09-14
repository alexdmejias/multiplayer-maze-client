import { connect } from 'react-redux';
import UserList from '../components/UserList';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  return {
    users: state.usersState
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserClick: (id) => {
      dispatch(actions.getData());
    }
  }
}

const UserListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);

export default UserListContainer