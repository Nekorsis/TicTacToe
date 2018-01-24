export const initialGameState = {
  ok: true,
  result: {
    player: 'X',
    ai: 'O',
    board: [
      [
        1,
        2,
        3,
      ],
      [
        4,
        5,
        6,
      ],
      [
        7,
        8,
        9,
      ],
    ],
    nextMove: 'X',
  },
};

export const baseUrl = 'http://localhost:3000/api';

export const initalScoreState = {
  ok: true,
  result: {
    a: 0,
    player: 0,
    X: 0,
    O: 0,
    list: [],
  },
};

export const getAiMove = (board, stateBoard, aiFigure) => {
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
