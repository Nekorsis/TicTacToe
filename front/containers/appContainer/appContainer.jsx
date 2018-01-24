import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MovesList from './../../components/movesList/movesList.jsx';
import * as actionCreators from './../../redux/actionCreators.js';

class AppContainer extends React.Component {
  componentWillMount() {
    this.props.actions.requestGame();
  }

  onBoardClick = (e) => {
    const { actions } = this.props;
    if (e.target.className.includes('row-element--cross') || e.target.className.includes('row-element--oval') || this.props.appState.isGameEnded === true) {
      return;
    }
    const fieldIndex = e.target.dataset.fieldid;
    const fieldMark = e.target.dataset.fieldmark;

    actions.pushMoveToList({ player: 'player', move: fieldMark });
    actions.sendNextMove(fieldIndex, this.props.appState.gameBoard);
  };

  onNextGameClick = () => {
    this.props.actions.requestNextGame();
  };

  getRowElementClassName = (type) => {
    let className = '';
    if (typeof type === 'string' && type === 'X') {
      className = 'row-element--cross';
    } else if (typeof type === 'string' && type === 'O') {
      className = 'row-element--oval';
    }
    return className;
  };

  render() {
    const boardLetters = ['A', 'B', 'C'];
    const boardNummbers = [1, 2, 3];
    return (
      <div className="game-field">
        <button className="score-link-button"><Link className="score-link" to="/score">Score</Link></button>
        <div className="team-container">{`AI: ${this.props.appState.aiTeam} Player: ${this.props.appState.playerTeam}`}</div>
        <MovesList moves={this.props.appState.listOfMoves} />
        <div className="game-field-numbers-container">
          {boardNummbers.map(item => <span key={item} className="game-field-number">{item}</span>)}
        </div>
        {this.props.appState.gameBoard ? this.props.appState.gameBoard.map((row, index) => {
          return (
            <div key={Math.random()} className="game-field-row">
              <span className="game-field-letter">{`${boardLetters[index]}`}</span>
              {row.map((element, newIndex) => {
                return (
                  <div
                    key={Math.random()}
                    data-fieldid={element}
                    data-fieldmark={`${boardLetters[index]} ${boardNummbers[newIndex]}`}
                    onClick={this.onBoardClick}
                    className={`row-element ${this.getRowElementClassName(element)}`}
                  />
                );
              })}
            </div>
          );
        }) : null}
        {
          this.props.appState.isGameEnded && this.props.appState.isGameEnded === true
          ?
            <button onClick={this.onNextGameClick} className="next-button">Next game</button>
          :
          null
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
)(AppContainer);

export default Connect;
