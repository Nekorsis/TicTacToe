import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from './../../redux/actionCreators.js';

class ScoreScreen extends React.Component {
  componentWillMount() {
    this.props.actions.requestScore();
  }

  render() {
    const scoreData = this.props.appState.score
      ? this.props.appState.score : null;
    let playerScore = null;
    let aiScore = null;
    let draws = null;
    if (scoreData !== null) {
      playerScore = scoreData.filter(item => item.winner === 'player');
      aiScore = scoreData.filter(item => item.winner === 'ai');
      draws = scoreData.filter(item => !item.winner);
    }
    return (
      <div className="score-container">
        {scoreData !== null
          ?
            <div>
              Total score
              <div>{`Player: ${playerScore.length} AI: ${aiScore.length} Draws: ${draws.length}`}</div>
              <div className="game-history-container">
                {scoreData.map((item) => {
                  if (item.winner && item.team) {
                    return <div key={item.ts}>{`Winner: ${item.winner} Team: ${item.team}`}</div>;
                  }
                  return <div key={item.ts}>Draw</div>;
                })}
              </div>
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
    appState: state.appReducers,
  };
};

const Connect = connect(
  mapStateToProps,
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  }),
)(ScoreScreen);

export default Connect;
