import {connect} from 'react-redux';
import Component from './component';
import * as sessionActions from '../../actions/session';

const mapStateToProps = (state) => {
  return {
    player: state.playerReducer,
    session: state.sessionReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const PersonalInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default PersonalInfo;
