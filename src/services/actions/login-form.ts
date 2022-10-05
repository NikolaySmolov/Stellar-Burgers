import { ACCESS_TOKEN, TOKEN } from '../../utils/constants';
import { fetchUserLogin, IErrorResponse } from '../api-rafactor';
import { AppDispatch } from '../types';
import { ILoginForm } from '../types/data';
import { setCookie } from '../utils';
import { getAuthFailedAction, getAuthSuccessAction } from './auth';
export const LOGIN_FORM_REQUEST: 'LOGIN_FORM_REQUEST' = 'LOGIN_FORM_REQUEST';
export const LOGIN_FORM_SUCCESS: 'LOGIN_FORM_SUCCESS' = 'LOGIN_FORM_SUCCESS';
export const LOGIN_FORM_FAILED: 'LOGIN_FORM_FAILED' = 'LOGIN_FORM_FAILED';
export const LOGIN_FORM_SET_VALUE: 'LOGIN_FORM_SET_VALUE' = 'LOGIN_FORM_SET_VALUE';
export const LOGIN_FORM_RESET_VALUES: 'LOGIN_FORM_RESET_VALUES' = 'LOGIN_FORM_RESET_VALUES';

interface IGetLoginFormRequestAction {
  readonly type: typeof LOGIN_FORM_REQUEST;
}

interface IGetLoginFormSuccessAction {
  readonly type: typeof LOGIN_FORM_SUCCESS;
}

interface IGetLoginFormFailedAction {
  readonly type: typeof LOGIN_FORM_FAILED;
  readonly payload: string;
}

interface IGetLoginFormSetValueAction {
  readonly type: typeof LOGIN_FORM_SET_VALUE;
  readonly payload: Partial<ILoginForm>;
}

interface IGetLoginFormResetValuesAction {
  readonly type: typeof LOGIN_FORM_RESET_VALUES;
}

export const getLoginFormRequestAction = (): IGetLoginFormRequestAction => ({
  type: LOGIN_FORM_REQUEST,
});

export const getLoginFormSuccessAction = (): IGetLoginFormSuccessAction => ({
  type: LOGIN_FORM_SUCCESS,
});

export const getLoginFormFailedAction = (payload: string): IGetLoginFormFailedAction => ({
  type: LOGIN_FORM_FAILED,
  payload,
});

export const getLoginFormSetValueAction = (
  payload: Partial<ILoginForm>
): IGetLoginFormSetValueAction => ({
  type: LOGIN_FORM_SET_VALUE,
  payload,
});

export const getLoginFormResetValuesAction = (): IGetLoginFormResetValuesAction => ({
  type: LOGIN_FORM_RESET_VALUES,
});

export type TLoginActions =
  | IGetLoginFormRequestAction
  | IGetLoginFormSuccessAction
  | IGetLoginFormFailedAction
  | IGetLoginFormSetValueAction
  | IGetLoginFormResetValuesAction;

export const setUserSignIn = (form: ILoginForm) => async (dispatch: AppDispatch) => {
  dispatch(getLoginFormRequestAction);

  try {
    const res = await fetchUserLogin(form);

    setCookie(ACCESS_TOKEN, res.accessToken, { path: '/' });
    setCookie(TOKEN, res.refreshToken, { path: '/' });

    dispatch(getLoginFormSuccessAction());
    dispatch(getAuthSuccessAction(res.user));
  } catch (err) {
    if ((err as IErrorResponse).success === false) {
      dispatch(getLoginFormFailedAction('Неверное имя пользователя или пароль'));
    } else {
      dispatch(
        getLoginFormFailedAction(
          'Произошла ошибка, попробуйте обновить страницу и\xA0отправить форму повторно'
        )
      );
    }
    dispatch(getAuthFailedAction());
  }
};
