import { ACCESS_TOKEN, API, TOKEN } from '../utils/constants';
import {
  TLoginForm,
  IUpdateToken,
  TUserInfo,
  TRegistrationForm,
  TAuthUser,
  TResetPassword,
  IEmail,
  IMailCode,
  IPassword,
  TProfileForm,
  TIngredientsIdList,
  IOrderDetails,
} from './types/data';
import { getCookie, setCookie } from './utils';

interface IRequestWithAuthorization extends RequestInit {
  headers: HeadersInit & {
    Authorization?: string;
  };
}

export interface IStatusResponse {
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

const fetchWithUpdateToken = async (url: string, options: IRequestWithAuthorization) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if ((err as IStatusResponse).message === 'jwt expired') {
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

export const fetchIngredients = async () => {
  const res = await fetch(`${API}/ingredients`);

  return checkResponse(res);
};

export const fetchUserInfo = (): Promise<TResponseBody<'user', TUserInfo>> => {
  return fetchWithUpdateToken(`${API}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + getCookie(ACCESS_TOKEN),
    },
  });
};

export const fetchUserLogin = async (form: TLoginForm): Promise<TResponseBody<''> & TAuthUser> => {
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
  form: TRegistrationForm
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

export const fetchResetPasswordCode = async (
  form: TResetPassword<IEmail>
): Promise<TResponseBody<''> & IStatusResponse> => {
  const res = await fetch(`${API}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });

  return checkResponse(res);
};

export const fetchSetNewPassword = async (
  form: TResetPassword<IMailCode & IPassword>
): Promise<TResponseBody<''> & IStatusResponse> => {
  const res = await fetch(`${API}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });

  return checkResponse(res);
};

export const fetchSetProfileData = (
  form: TProfileForm
): Promise<TResponseBody<'user', TUserInfo>> => {
  return fetchWithUpdateToken(`${API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + getCookie(ACCESS_TOKEN),
    },
    body: JSON.stringify(form),
  });
};

export const fetchSetUserLogout = async (): Promise<TResponseBody<''>> => {
  const res = await fetch(`${API}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getCookie(TOKEN) }),
  });

  return checkResponse(res);
};

export const fetchMakeOrder = (
  ingredientsIdList: TIngredientsIdList
): Promise<TResponseBody<''> & IOrderDetails> => {
  return fetchWithUpdateToken(`${API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie(ACCESS_TOKEN),
    },
    body: JSON.stringify({ ingredients: ingredientsIdList }),
  });
};
