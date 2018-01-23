import { combineReducers } from 'redux';
import { actionTypes as types } from './actionTypes.js';

const initialState = {
  gameBoard: null,
  isGameEnded: false,
  listOfMoves: [],
  score: null,
};

const appReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_GAME:
      return {
        ...state,
        gameBoard: action.payload.result.board,
        isGameEnded: action.payload.result.end,
      };
    case types.RESET_MOVE_LIST:
      return {
        ...state,
        listOfMoves: [],
      };
    case types.PUSH_MOVE_TO_LIST:
      return {
        ...state,
        listOfMoves: [...state.listOfMoves, action.payload],
      };
    case types.SEND_NEXT_MOVE:
      return {
        ...state,
        gameBoard: action.payload.data.result.board,
        isGameEnded: action.payload.data.result.end,
      };
    case types.REQUEST_NEXT_GAME:
      return {
        ...state,
        gameBoard: action.payload.result.board,
        isGameEnded: action.payload.result.end,
      };
    case types.REQUEST_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    case types.RESET_SCORE:
      return {
        ...state,
        score: [],
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  appReducers,
});

export default reducer;
