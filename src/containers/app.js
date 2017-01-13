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
    playerMove: (newPos) => {
      dispatch(actions.playerMoved(newPos));
    },
    playerFinished: () => {
      dispatch(actions.playerFinished());
    }
  };
};

const ConnectionListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectionListContainer;
