import { ACCESS_TOKEN, TOKEN } from '../../utils/constants';
import { fetchUserRegistration, IStatusResponse } from '../api-rafactor';
import { AppDispatch } from '../types';
import { TRegistrationForm } from '../types/data';
import { setCookie } from '../utils';
import { getAuthFailedAction, getAuthSuccessAction } from './auth';

export const REGISTER_FORM_REQUEST: 'REGISTER_FORM_REQUEST' = 'REGISTER_FORM_REQUEST';
export const REGISTER_FORM_SUCCESS: 'REGISTER_FORM_SUCCESS' = 'REGISTER_FORM_SUCCESS';
export const REGISTER_FORM_FAILED: 'REGISTER_FORM_FAILED' = 'REGISTER_FORM_FAILED';
export const REGISTER_FORM_SET_VALUE: 'REGISTER_FORM_SET_VALUE' = 'REGISTER_FORM_SET_VALUE';
export const REGISTER_FORM_RESET_VALUES: 'REGISTER_FORM_RESET_VALUES' =
  'REGISTER_FORM_RESET_VALUES';

interface IGetRegistrationFormRequestAction {
  readonly type: typeof REGISTER_FORM_REQUEST;
}

interface IGetRegistrationFormSuccessAction {
  readonly type: typeof REGISTER_FORM_SUCCESS;
}

interface IGetRegistrationFormFailedAction {
  readonly type: typeof REGISTER_FORM_FAILED;
  readonly payload: string;
}

interface IGetRegistrationFormSetValueAction {
  readonly type: typeof REGISTER_FORM_SET_VALUE;
  readonly payload: Partial<TRegistrationForm>;
}

interface IGetRegistrationFormResetValuesAction {
  readonly type: typeof REGISTER_FORM_RESET_VALUES;
}

export type TRegistrationFormActions =
  | IGetRegistrationFormRequestAction
  | IGetRegistrationFormSuccessAction
  | IGetRegistrationFormFailedAction
  | IGetRegistrationFormSetValueAction
  | IGetRegistrationFormResetValuesAction;

export const getRegistrationFormRequestAction = (): IGetRegistrationFormRequestAction => ({
  type: REGISTER_FORM_REQUEST,
});

export const getRegistrationFormSuccessAction = (): IGetRegistrationFormSuccessAction => ({
  type: REGISTER_FORM_SUCCESS,
});

export const getRegistrationFormFailedAction = (
  payload: string
): IGetRegistrationFormFailedAction => ({
  type: REGISTER_FORM_FAILED,
  payload,
});

export const getRegistrationFormSetValueAction = (
  payload: Partial<TRegistrationForm>
): IGetRegistrationFormSetValueAction => ({
  type: REGISTER_FORM_SET_VALUE,
  payload,
});

export const getRegistrationFormResetValuesAction = (): IGetRegistrationFormResetValuesAction => ({
  type: REGISTER_FORM_RESET_VALUES,
});

export const setUserSignUp = (form: TRegistrationForm) => async (dispatch: AppDispatch) => {
  dispatch(getRegistrationFormRequestAction);

  try {
    const res = await fetchUserRegistration(form);

    setCookie(ACCESS_TOKEN, res.accessToken.split('Bearer ')[1], { path: '/' });
    setCookie(TOKEN, res.refreshToken, { path: '/' });

    dispatch(getRegistrationFormSuccessAction());
    dispatch(getAuthSuccessAction(res.user));
  } catch (err) {
    if ((err as IStatusResponse).message === 'Email, password and name are required fields') {
      dispatch(getRegistrationFormFailedAction('Зполните все поля'));
    } else if ((err as IStatusResponse).message === 'User already exists') {
      dispatch(getRegistrationFormFailedAction('Пользователь уже зарегистрирован'));
    } else {
      dispatch(
        getRegistrationFormFailedAction(
          'Произошла ошибка, попробуйте обновить страницу и\xA0отправить форму повторно'
        )
      );
    }
    dispatch(getAuthFailedAction());
  }
};
