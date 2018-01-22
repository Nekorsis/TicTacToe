import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppContainer from './containers/appContainer/appContainer.jsx';
import { requestGame } from './redux/actionCreators.js';

const mapStateToProps = (state) => {
  return {
    appState: state.appReducer,
  };
};

const Connect = connect(
  mapStateToProps,
  dispatch => ({
    actions: bindActionCreators(requestGame, dispatch),
  }),
)(AppContainer);

export default Connect;

