import React from 'react';

const MovesList = (moves) => {
  console.log('lul: ', moves);
  return (
    <div>
      {moves.length !== 0
        ? moves.moves.map((item) => {
          return (
            <div key={Math.random()}>
              {item !== null ? `${item.player} ${item.move}` : null}
            </div>
          );
      })
        : null}
    </div>
  );
};

export default MovesList;
