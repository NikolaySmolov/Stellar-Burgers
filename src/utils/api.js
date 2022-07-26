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
