import { ACCESS_TOKEN, API, TOKEN } from '../utils/constants';
import { ILogin, IUpdateToken, IUser } from './types/data';
import { getCookie, setCookie } from './utils';

interface IRequestOptions extends RequestInit {
  headers: {
    'Content-type': string;
    Authorization?: string;
  };
}

interface IErrorResponse {
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

const updateToken = async (): Promise<IUpdateToken> => {
  const res = await fetch(`${API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getCookie(TOKEN) }),
  });

  return await checkResponse(res);
};

const fetchWithUpdateToken = async (url: string, options: IRequestOptions) => {
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

export const fetchUserInfo = (): Promise<TResponseBody<'user', IUser>> => {
  return fetchWithUpdateToken(`${API}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
    },
  });
};

export const fetchUserLogin = async (
  form: ILogin
): Promise<TResponseBody<'user', IUser> & IUpdateToken> => {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};
