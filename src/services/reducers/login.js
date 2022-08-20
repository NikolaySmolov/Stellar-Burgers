import {
  LOGIN_FORM_FAILED,
  LOGIN_FORM_RESET_VALUES,
  LOGIN_FORM_SET_VALUE,
  LOGIN_FORM_SUBMIT,
  LOGIN_FORM_SUCCESS,
} from '../../utils/constants';

const initialState = {
  form: {
    email: '',
    password: '',
  },
  loginRequest: false,
  loginFailed: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FORM_SET_VALUE:
      return { ...state, form: { ...state.form, ...action.payload } };
    case LOGIN_FORM_RESET_VALUES:
      return { ...initialState };
    case LOGIN_FORM_SUBMIT:
      return { ...state, loginRequest: true };
    case LOGIN_FORM_SUCCESS:
      return { ...state, loginRequest: false };
    case LOGIN_FORM_FAILED:
      return { ...state, loginRequest: false, loginFailed: true };
    default:
      return state;
  }
};
