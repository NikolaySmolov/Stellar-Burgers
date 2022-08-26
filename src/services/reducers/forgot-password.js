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

const initialState = {
  form: {
    email: '',
    password: '',
    token: '',
  },
  getCodeRequest: false,
  getCodeFailed: false,
  getCodeSuccess: false,
  setPasswordRequest: false,
  setPasswordFailed: false,
  setPasswordSuccess: false,
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_FORM_VALUE:
      return { ...state, form: { ...state.form, ...action.payload } };
    case FORGOT_PASSWORD_FORM_RESET_VALUES:
      return { ...initialState, getCodeSuccess: state.getCodeSuccess };
    case FORGOT_PASSWORD_GET_CODE_SUBMIT:
      return { ...state, getCodeRequest: true };
    case FORGOT_PASSWORD_GET_CODE_SUCCESS:
      return { ...state, getCodeRequest: false, getCodeSuccess: true };
    case FORGOT_PASSWORD_GET_CODE_RESET:
      return { ...state, getCodeSuccess: false };
    case FORGOT_PASSWORD_GET_CODE_FAILED:
      return { ...state, getCodeRequest: false, getCodeFailed: true };
    case FORGOT_PASSWORD_SET_PASSWORD_SUBMIT:
      return { ...state, setPasswordRequest: true };
    case FORGOT_PASSWORD_SET_PASSWORD_SUCCESS:
      return { ...state, setPasswordRequest: false, setPasswordSuccess: true };
    case FORGOT_PASSWORD_SET_PASSWORD_FAILED:
      return { ...state, setPasswordRequest: false, setPasswordFailed: true };
    default:
      return state;
  }
};
