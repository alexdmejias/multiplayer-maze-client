import {connect} from 'react-redux';
import PlayerList from '../components/PlayerList';

const mapStateToProps = (state) => {
  const {playersReducer} = state;

  return {
    players: playersReducer.players
  };
};

export default connect(mapStateToProps)(PlayerList);
