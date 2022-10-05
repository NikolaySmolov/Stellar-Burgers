import {
  LOGIN_FORM_FAILED,
  LOGIN_FORM_REQUEST,
  LOGIN_FORM_RESET_VALUES,
  LOGIN_FORM_SET_VALUE,
  LOGIN_FORM_SUCCESS,
  TLoginActions,
} from '../actions/login-form';

interface ILoginFormState {
  email: string;
  password: string;
  loginRequest: boolean;
  loginFailed: boolean;
  error: null | string;
}

const initState: ILoginFormState = {
  email: '',
  password: '',
  loginRequest: false,
  loginFailed: false,
  error: null,
};

export const loginFormReducer = (state = initState, action: TLoginActions): ILoginFormState => {
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
      return { ...state, loginRequest: false, loginFailed: true, error: action.payload };
    default:
      return state;
  }
};
