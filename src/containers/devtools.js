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
    },
    setHeartBeat: (state) => {
      dispatch(sessionActions.setHeartBeat(state));
    }
  };
};

const DevToolsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DevTools);

export default DevToolsContainer;
