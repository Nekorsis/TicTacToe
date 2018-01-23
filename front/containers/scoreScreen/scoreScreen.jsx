import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from './../../redux/actionCreators.js';

class ScoreScreen extends React.Component {
  componentWillMount() {
    this.props.actions.requestScore();
  }

  render() {
    const scoreData = this.props.state.appReducers.score
      ? this.props.state.appReducers.score.filter(element => element.winner) : null;
    let playerScore = null;
    let aiScore = null;
    if (scoreData !== null) {
      playerScore = scoreData.filter(item => item.winner === 'player');
      aiScore = scoreData.filter(item => item.winner === 'ai');
    }
    return (
      <div className="score-container">
        {scoreData !== null
          ?
            <div>
              <div>{`player score: ${playerScore.length}`}</div>
              <div>{`ai score: ${aiScore.length}`}</div>
            </div>
          :
            <div>Score is 0 : 0</div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const Connect = connect(
  mapStateToProps,
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  }),
)(ScoreScreen);

export default Connect;
