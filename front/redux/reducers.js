import { combineReducers } from 'redux';
import { actionTypes } from './actionCreators.js';

const initialState = {
  gameBoard: null,
  isGameEnded: false,
  listOfMoves: [],
};

const appReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_NEXT_GAME:
      return {
        ...state,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  appReducers,
});

export default reducer;
