import React from 'react';

const MovesList = (moves) => {

  const formatMove = (move) => {
    if (move.player !== 'ai') {
      return `${move.player}: ${move.move}`;
    }
    const boardLetter = move.move.split(' ')[0];
    const boardNumber = move.move.split(' ')[1];
    if (boardLetter === '0') {
      return `ai: A ${parseInt(boardNumber, 10) + 1}`;
    } else if (boardLetter === '1') {
      return `ai: B ${parseInt(boardNumber, 10) + 1}`;
    } else if (boardLetter === '2') {
      return `ai: C ${parseInt(boardNumber, 10) + 1}`;
    }
  };

  return (
    <div className="moves-list-container">
      {moves.length !== 0
        ? moves.moves.map((item) => {
          return (
            <div key={Math.random()}>
              {item !== null ? `${formatMove(item)}` : null}
            </div>
          );
      })
        : '-----'}
    </div>
  );
};

export default MovesList;
