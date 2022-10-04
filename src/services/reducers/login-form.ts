import {
  LOGIN_FORM_FAILED,
  LOGIN_FORM_REQUEST,
  LOGIN_FORM_RESET_VALUES,
  LOGIN_FORM_SET_VALUE,
  LOGIN_FORM_SUCCESS,
  TLoginActions,
} from '../actions/login-form';

interface IInitState {
  email: string;
  password: string;
  loginRequest: boolean;
  loginFailed: boolean;
}

const initState: IInitState = {
  email: '',
  password: '',
  loginRequest: false,
  loginFailed: false,
};

export const loginReducer = (state = initState, action: TLoginActions) => {
  switch (action.type) {
    case LOGIN_FORM_SET_VALUE:
      return { ...state, loginFailed: false, ...action.payload };
    case LOGIN_FORM_RESET_VALUES:
      return { ...initState };
    case LOGIN_FORM_REQUEST:
      return { ...state, loginRequest: true };
    case LOGIN_FORM_SUCCESS:
      return { ...state, loginRequest: false };
    case LOGIN_FORM_FAILED:
      return { ...state, loginRequest: false, loginFailed: true };
    default:
      return state;
  }
};
