import { API } from './constants';

async function checkResponse(res) {
  return res.ok ? await res.json() : Promise.reject(`res.ok: ${res.ok}, res.status: ${res.status}`);
}

export const requireIngredients = async () => {
  const res = await fetch(`${API}/ingredients`);

  return checkResponse(res);
};

export const requireOrder = async order => {
  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: order }),
  });

  return checkResponse(res);
};

// {
//   "success": true,
//   "user": {
//       "email": "n.smolov@gmail.com",
//       "name": "Nikolay"
//   },
//   "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmQ2OGI3NDJkMzRhMDAxYzI4MTU0ZCIsImlhdCI6MTY2MDc3NDU4MywiZXhwIjoxNjYwNzc1NzgzfQ.E0Y53sRXj2O5Y90JTEGvCYjKwYrCKW5Cebuqarp_c3c",
//   "refreshToken": "99c60566002a92775cc365da91d7bda45afc50f6c915dc21d092b878f82a48c6cdedde17c1621c88"
// }

//RESPONSE register POST
// {
//   "success": false,
//   "message": "email or password are incorrect"
// }

// "success": true,
//     "user": {
//         "email": "f@3.ru",
//         "name": "f"
//     },
//     "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmQ2YTg1NDJkMzRhMDAxYzI4MTU2YiIsImlhdCI6MTY2MDc3NTA0NSwiZXhwIjoxNjYwNzc2MjQ1fQ.O7_jSbOE0r-GhMEEhKZFSP-eUuWjOSDC3zi9u2dLsH0",
//     "refreshToken": "cc717c1a380df5cb36c517730ddf5cc700650e929c5fc37bbb66a5490df3521d23065fe40922b679"
// }

//POST
// {
//   "token": "99c60566002a92775cc365da91d7bda45afc50f6c915dc21d092b878f82a48c6cdedde17c1621c88"
// }

//RESPONSE
// "success": true,
// "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmQ2OGI3NDJkMzRhMDAxYzI4MTU0ZCIsImlhdCI6MTY2MDc3NjIxNSwiZXhwIjoxNjYwNzc3NDE1fQ.PlbigO-462WTh1gogAlqRQU2mJqQ4wF1-CVyE3qLRAo",
// "refreshToken": "5b5df21f64ade41ef1673783f2e3559044b1a984f990df7c99aaad6fff5c385939730569a16d8b44"
