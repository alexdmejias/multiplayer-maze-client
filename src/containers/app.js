import {connect} from 'react-redux';
import App from '../components/App';
import * as actions from '../actions/player';

const mapStateToProps = (state) => {
  return {
    player: state.playerReducer,
    session: state.sessionReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    socketConnect: () => {
      dispatch({type: 'SOCKET_CONNECT'});
    },
    playerMoved: (newPos) => {
      dispatch(actions.playerMoved(newPos));
    },
    playerScored: () => {
      dispatch(actions.playerScored());
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
