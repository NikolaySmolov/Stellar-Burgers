import {
  AUTH_FORM_FAILED,
  AUTH_FORM_SET_VALUE,
  AUTH_FORM_SUBMIT,
  AUTH_FORM_SUCCESS,
} from '../../utils/constants';
import { register } from '../api';

export const setAuthFormValue = (field, value) => ({
  type: AUTH_FORM_SET_VALUE,
  payload: { [field]: value },
});

export const signUp = form => dispatch => {
  dispatch({ type: AUTH_FORM_SUBMIT });

  register(form)
    .then(data => {
      dispatch({ type: AUTH_FORM_SUCCESS, payload: data });
    })
    .catch(err => {
      dispatch({ type: AUTH_FORM_FAILED, payload: err });
    });
};
