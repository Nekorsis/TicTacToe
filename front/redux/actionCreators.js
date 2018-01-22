export const actionTypes = {
  REQUEST_NEXT_GAME: 'REQUEST_NEXT_GAME',
  SEND_NEXT_MOVE: 'SEND_NEXT_MOVE',
};

export const requestGame = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/api/game')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('action fetch: ', data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
