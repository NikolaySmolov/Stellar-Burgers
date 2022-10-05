import { ACCESS_TOKEN, API, TOKEN } from '../utils/constants';
import { ILoginForm, IUpdateToken, IUserInfo, IRegistrationForm, TAuthUser } from './types/data';
import { getCookie, setCookie } from './utils';

interface IRequestWithTokenOptions extends RequestInit {
  headers: HeadersInit & {
    Authorization?: string;
  };
}

export interface IErrorResponse {
  message: string;
  success: boolean;
}

type TResponseBody<TDataKey extends string, TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;
};

const checkResponse = async (res: Response) => {
  return res.ok ? await res.json() : Promise.reject(await res.json());
};

const updateToken = async (): Promise<TResponseBody<''> & IUpdateToken> => {
  const res = await fetch(`${API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getCookie(TOKEN) }),
  });

  return await checkResponse(res);
};

const fetchWithUpdateToken = async (url: string, options: IRequestWithTokenOptions) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if ((err as IErrorResponse).message === 'jwt expired') {
      const updateData = await updateToken();

      if (!updateData.success) {
        return Promise.reject(updateData);
      }
      setCookie(TOKEN, updateData.refreshToken, { path: '/' });
      setCookie(ACCESS_TOKEN, updateData.accessToken.split('Bearer ')[1], { path: '/' });
      options.headers.Authorization = updateData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const fetchUserInfo = (): Promise<TResponseBody<'user', IUserInfo>> => {
  return fetchWithUpdateToken(`${API}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
    },
  });
};

export const fetchUserLogin = async (form: ILoginForm): Promise<TResponseBody<''> & TAuthUser> => {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};

export const fetchUserRegistration = async (
  form: IRegistrationForm
): Promise<TResponseBody<''> & TAuthUser> => {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });

  return checkResponse(res);
};
