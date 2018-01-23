import { actionTypes as types } from './actionTypes.js';
import { getAiMove, initialGameState, initalScoreState } from './../utils/index.js';

export const requestGame = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/api/game')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({ type: types.REQUEST_GAME, payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const requestNextGame = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/api/game/next')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.result.ai === 'X') {
          const aiMove = getAiMove(data.result.board, initialGameState.result.board, data.result.ai);
          dispatch({ type: types.RESET_MOVE_LIST });
          dispatch({ type: types.PUSH_MOVE_TO_LIST, payload: aiMove });
        }
        if (data.result.ai !== 'X') {
          dispatch({ type: types.RESET_MOVE_LIST });
        }
        dispatch({ type: types.REQUEST_NEXT_GAME, payload: data });
      });
  };
};

export const pushMoveToList = (move) => {
  return {
    type: types.PUSH_MOVE_TO_LIST,
    payload: move,
  };
};

export const sendNextMove = (move, boardState) => {
  return (dispatch) => {
    const requestBody = {
      index: parseInt(move, 10),
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
        const aiMove = getAiMove(data.result.board, boardState, data.result.ai);
        dispatch({ type: types.PUSH_MOVE_TO_LIST, payload: aiMove });
        dispatch({ type: types.SEND_NEXT_MOVE, payload: { data } });
      });
  };
};

export const requestScore = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/api/score')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({ type: types.REQUEST_SCORE, payload: data.result.list });
      });
  };
};

export const resetScore = () => {
  return (dispatch) => {
    const requestBody = {
      index: initalScoreState,
    };
    const httpHeaders = {
      'Content-Type': 'application/json',
    };
    const myHeaders = new Headers(httpHeaders);
    fetch('http://localhost:3000/api/score/reset', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: myHeaders,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({ type: types.RESET_SCORE });
      });
  };
};

export const resetMovesList = () => {
  return {
    type: types.RESET_MOVE_LIST,
  };
};

