import {
  REGISTER_FORM_FAILED,
  REGISTER_FORM_SET_VALUE,
  REGISTER_FORM_RESET_VALUES,
  REGISTER_FORM_SUBMIT,
  REGISTER_FORM_SUCCESS,
  ACCESS_TOKEN,
  TOKEN,
} from '../../utils/constants';
import { requireRegistration } from '../api';
import { setCookie } from '../utils';

export const setRegisterFormValue = (field, value) => ({
  type: REGISTER_FORM_SET_VALUE,
  payload: { [field]: value },
});

export const resetRegisterFormValue = () => ({
  type: REGISTER_FORM_RESET_VALUES,
});

export const setRegisterFormFailed = () => ({
  type: REGISTER_FORM_FAILED,
});

export const signUp = (form) => (dispatch) => {
  dispatch({ type: REGISTER_FORM_SUBMIT });

  requireRegistration(form)
    .then((data) => {
      const accessToken = data.accessToken.split('Bearer ')[1];
      const token = data.refreshToken;

      setCookie(ACCESS_TOKEN, accessToken, { 'max-age': 1200, path: '/' });
      setCookie(TOKEN, token, { path: '/' });

      dispatch({ type: REGISTER_FORM_SUCCESS });
    })
    .catch((err) => {
      if (err.status === 403) {
        dispatch({ type: REGISTER_FORM_FAILED, payload: 'Пользователь уже зарегистрирован' });
      } else {
        dispatch({ type: REGISTER_FORM_FAILED, payload: null });
      }
    });
};
