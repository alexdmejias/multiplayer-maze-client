import {connect} from 'react-redux';
import Overlay from '../components/Overlay';
import * as sessionActions from '../actions/session';
import * as uiActions from '../actions/ui';

const mapStateToProps = (state) => {
  return {
    username: state.sessionReducer.username,
    showOverlay: state.uiReducer.showOverlay
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUsername: (newUsername) => {
      dispatch(sessionActions.changeUsername(newUsername));
    },
    setOverlay: () => {
      dispatch(uiActions.setOverlay(false));
    }
  };
};

const OverlayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Overlay);

export default OverlayContainer;
