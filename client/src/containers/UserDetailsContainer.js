import { connect } from 'react-redux';
import UserDetails from '../components/UserDetails';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  return {
    details: state.userDetails
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => {
      dispatch(actions.hideDetails())
    }
  }
}

const UserDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetails);

export default UserDetailsContainer;
