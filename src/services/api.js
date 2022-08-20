import { API } from '../utils/constants';

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

export const requireRegistration = async form => {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};

export const requireLogin = async form => {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};

export const requireResetCode = async form => {
  const res = await fetch(`${API}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(form),
  });

  return checkResponse(res);
};

export const requireSetPassword = async form => {
  const res = await fetch(`${API}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(form),
  });

  return checkResponse(res);
};
