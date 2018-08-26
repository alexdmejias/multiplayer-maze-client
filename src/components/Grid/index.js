import {connect} from 'react-redux';
import Grid from './component';
import * as actions from '../../actions/player';

const mapStateToProps = (state) => {
  return {
    player: state.playerReducer,
    session: state.sessionReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playerMoved: (newPos) => {
      dispatch(actions.playerMoved(newPos));
    },
    playerScored: () => {
      dispatch(actions.playerScored());
    }
  };
};

const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);

export default GridContainer;
