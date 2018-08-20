import {connect} from 'react-redux';
import PlayerList from './component';

const mapStateToProps = (state) => {
  const {playersReducer} = state;

  return {
    players: playersReducer.players
  };
};

export default connect(mapStateToProps)(PlayerList);
