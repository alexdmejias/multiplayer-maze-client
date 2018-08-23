import {connect} from 'react-redux';
import PlayerList from './component';

const mapStateToProps = (state) => {
  const {playersReducer, sessionReducer} = state;

  return {
    players: playersReducer.players,
    player: {
      username: sessionReducer.username,
      id: sessionReducer.id
    }
  };
};

export default connect(mapStateToProps)(PlayerList);
