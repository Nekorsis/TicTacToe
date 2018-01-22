import React from 'react';
import { Link } from 'react-router-dom';

import MovesList from './../../components/movesList/movesList.jsx';
import { initialGameState } from './../../utils/index.js';

class AppContainer extends React.Component {
  componentWillMount() {
    fetch('http://localhost:3000/api/game')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          gameBoard: data.result.board,
          isGameEnded: data.result.end,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      gameBoard: null,
      isGameEnded: false,
      listOfMoves: [],
    };
  }

  getAiMove = (board, stateBoard, aiFigure) => {
    let result = null;
    board.forEach((element, index) => {
      element.forEach((item, innerIndex) => {
        const testVar = stateBoard[index];
        if (item !== testVar[innerIndex] && item === aiFigure) {
          result = { player: 'ai', move: `${index} ${innerIndex}` };
        }
      });
    });
    return result;
  };

  onBoardClick = (e) => {
    if (e.target.className.includes('row-element--cross') || e.target.className.includes('row-element--oval') || this.state.isGameEnded === true) {
      return;
    }
    const fieldIndex = e.target.dataset.fieldid;
    const fieldMark = e.target.dataset.fieldmark;

    this.setState({
      listOfMoves: [...this.state.listOfMoves, { player: 'player', move: fieldMark }],
    });

    const requestBody = {
      index: parseInt(fieldIndex, 10),
    };
    const httpHeaders = {
      'Content-Type': 'application/json',
    };
    const myHeaders = new Headers(httpHeaders);

    fetch('http://localhost:3000/api/game/move', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: myHeaders,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const aiMove = this.getAiMove(data.result.board, this.state.gameBoard, data.result.ai);
        this.setState({
          gameBoard: data.result.board,
          isGameEnded: data.result.end,
          listOfMoves: [...this.state.listOfMoves, aiMove],
        });
      });
  };

  onRestartClick = () => {
    const requestBody = initialGameState;
    const httpHeaders = {
      'Content-Type': 'application/json',
    };
    const myHeaders = new Headers(httpHeaders);

    fetch('http://localhost:3000/api/game/reset', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: myHeaders,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          gameBoard: data.result.board,
          isGameEnded: data.result.end,
          listOfMoves: [],
        });
      });
  };

  onNextGameClick = () => {
    fetch('http://localhost:3000/api/game/next')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let aiMove = null;
        if (data.result.ai === 'X') {
          aiMove = this.getAiMove(data.result.board, initialGameState.result.board, data.result.ai);
          console.log('next game aimove, firt move by ai: ', aiMove);
        }
        this.setState({
          gameBoard: data.result.board,
          isGameEnded: data.result.end,
          listOfMoves: data.result.ai === 'X' ? [aiMove] : [],
        });
      });
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
        <Link to="/score">Score</Link>
        {/* <button onClick={this.onRestartClick} className="restart-button">Reset game</button> */}
        <MovesList moves={this.state.listOfMoves} />
        {
          this.state.isGameEnded && this.state.isGameEnded === true
          ?
            <button onClick={this.onNextGameClick} className="next-button">Next game</button>
          :
          null
        }
        <div className="game-field-numbers-container">
          {boardNummbers.map(item => <span key={item} className="game-field-number">{item}</span>)}
        </div>
        {this.state.gameBoard ? this.state.gameBoard.map((row, index) => {
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
      </div>
    );
  }
}

export default AppContainer;
