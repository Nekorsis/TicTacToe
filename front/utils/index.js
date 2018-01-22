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

export const fetchApi = (method, url, body, headers) => {
  const baseUrl = 'http://localhost:3000/api';
  let result = null;

  if (method === 'GET') {
    fetch(`${baseUrl}${url}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('initial data: ', data.result);
        result = data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  }
  console.log('hi');
};
