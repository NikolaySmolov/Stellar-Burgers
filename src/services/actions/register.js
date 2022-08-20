import {
  REGISTER_FORM_FAILED,
  REGISTER_FORM_SET_VALUE,
  REGISTER_FORM_RESET_VALUES,
  REGISTER_FORM_SUBMIT,
  REGISTER_FORM_SUCCESS,
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

export const signUp = form => dispatch => {
  dispatch({ type: REGISTER_FORM_SUBMIT });

  requireRegistration(form)
    .then(data => {
      const accessToken = data.accessToken.split('Bearer ')[1];
      const token = data.refreshToken;

      setCookie('accessToken', accessToken, { 'max-age': 1200 });
      setCookie('token', token);

      dispatch({ type: REGISTER_FORM_SUCCESS });
    })
    .catch(() => dispatch({ type: REGISTER_FORM_FAILED }));
};
