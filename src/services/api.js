import { API } from '../utils/constants';
import { setCookie } from './utils';

async function checkResponse(res) {
  if (res.ok) {
    const authToken =
      res.headers.has('authorization') && res.headers.get('authorization').split('Bearer ')[1];

    if (authToken) {
      setCookie(authToken);
    }

    return await res.json();
  } else {
    return Promise.reject(`res.ok: ${res.ok}, res.status: ${res.status}`);
  }
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

export const register = async form => {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};
