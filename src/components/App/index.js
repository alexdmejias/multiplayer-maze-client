import {connect} from 'react-redux';
import App from './component';
import * as actions from '../../actions/player';

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
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
