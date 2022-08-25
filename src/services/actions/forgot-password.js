import {
  FORGOT_PASSWORD_FORM_VALUE,
  FORGOT_PASSWORD_FORM_RESET_VALUES,
  FORGOT_PASSWORD_GET_CODE_SUBMIT,
  FORGOT_PASSWORD_GET_CODE_SUCCESS,
  FORGOT_PASSWORD_GET_CODE_FAILED,
  FORGOT_PASSWORD_SET_PASSWORD_SUBMIT,
  FORGOT_PASSWORD_SET_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_SET_PASSWORD_FAILED,
  FORGOT_PASSWORD_GET_CODE_RESET,
} from '../../utils/constants';
import { requireResetCode, requireSetPassword } from '../api';

export const setForgotPasswordFormValue = (field, value) => ({
  type: FORGOT_PASSWORD_FORM_VALUE,
  payload: { [field]: value },
});

export const resetForgotPasswordCode = () => ({
  type: FORGOT_PASSWORD_GET_CODE_RESET,
});

export const resetForgotPasswordFormValues = () => ({
  type: FORGOT_PASSWORD_FORM_RESET_VALUES,
});

export const getResetCode = form => dispatch => {
  dispatch({ type: FORGOT_PASSWORD_GET_CODE_SUBMIT });

  requireResetCode(form)
    .then(() => dispatch({ type: FORGOT_PASSWORD_GET_CODE_SUCCESS }))
    .catch(() => dispatch({ type: FORGOT_PASSWORD_GET_CODE_FAILED }));
};

export const setPassword = form => dispatch => {
  dispatch({ type: FORGOT_PASSWORD_SET_PASSWORD_SUBMIT });

  requireSetPassword(form)
    .then(() => dispatch({ type: FORGOT_PASSWORD_SET_PASSWORD_SUCCESS }))
    .catch(() => dispatch({ type: FORGOT_PASSWORD_SET_PASSWORD_FAILED }));
};
