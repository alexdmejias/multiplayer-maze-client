import {connect} from 'react-redux';
import App from '../components/App';
import * as actions from '../actions/player'


const mapStateToProps = (state) => {
  return {
    player: state.playerReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playerMove: (newPos) => {
      dispatch(actions.playerMoved(newPos));
    }
  };
};

const ConnectionListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectionListContainer;
