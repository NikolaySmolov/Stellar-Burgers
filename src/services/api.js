import { API } from '../utils/constants';
import { getCookie } from './utils';

async function checkResponse(res) {
  return res.ok ? await res.json() : Promise.reject(`res.ok: ${res.ok}, res.status: ${res.status}`);
}

export const requireIngredients = async () => {
  const res = await fetch(`${API}/ingredients`);

  return checkResponse(res);
};

const setPostParams = bodyPaylod => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bodyPaylod),
});

export const requireOrder = async order => {
  const res = await fetch(`${API}/orders`, setPostParams({ ingredients: order }));

  return checkResponse(res);
};

export const requireRegistration = async form => {
  const res = await fetch(`${API}/auth/register`, setPostParams(form));
  return checkResponse(res);
};

export const requireLogin = async form => {
  const res = await fetch(`${API}/auth/login`, setPostParams(form));
  return checkResponse(res);
};

export const requireResetCode = async form => {
  const res = await fetch(`${API}/password-reset`, setPostParams(form));

  return checkResponse(res);
};

export const requireSetPassword = async form => {
  const res = await fetch(`${API}/password-reset/reset`, setPostParams(form));

  return checkResponse(res);
};

export const getRefreshToken = async token => {
  const res = await fetch(`${API}/auth/token`, setPostParams({ token }));
  return checkResponse(res);
};

export const getProfileInfo = async accessToken => {
  const res = await fetch(`${API}//auth/user`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return checkResponse(res);
};

export const setProfileInfo = async (accessToken, form) => {
  const res = await fetch(`${API}//auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};

export const setlogout = async token => {
  const res = await fetch(`${API}/auth/logout`, setPostParams({ token }));
  return checkResponse(res);
};
