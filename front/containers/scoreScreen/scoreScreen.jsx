import React from 'react';

class ScoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsList: null,
    };
  }
  componentWillMount() {
    fetch('http://localhost:3000/api/score')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('score: ', data.result);
        this.setState({
          resultsList: data.result.list,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const scoreData = this.state.resultsList ? this.state.resultsList.filter(element => element.winner) : null;
    let playerScore = null;
    let aiScore = null;
    if (scoreData !== null) {
      playerScore = scoreData.filter(item => item.winner === 'player');
      aiScore = scoreData.filter(item => item.winner === 'ai');
      console.log('test: ', scoreData, 'player score: ', playerScore, 'ai score: ', aiScore);
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

export default ScoreScreen;
