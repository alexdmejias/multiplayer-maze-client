import {connect} from 'react-redux';
import DevTools from '../components/DevTools/DevTools';
import * as sessionActions from '../actions/session';


const mapStateToProps = (state) => {
  return {
    player: state.playerReducer,
    session: state.sessionReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    transitionTo: (state) => {
      dispatch(sessionActions.stateChange(state, true));
    }
  };
};

const DevToolsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DevTools);

export default DevToolsContainer;
