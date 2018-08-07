import {connect} from 'react-redux';
import PlayerList from '../components/PlayerList';

const mapStateToProps = (state) => {
  const {opponentsReducer} = state;
  return {
    players: opponentsReducer
  };
};

export default connect(mapStateToProps)(PlayerList);
