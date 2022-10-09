import {
  LOGIN_FORM_FAILED,
  LOGIN_FORM_REQUEST,
  LOGIN_FORM_RESET_VALUES,
  LOGIN_FORM_SET_VALUE,
  LOGIN_FORM_SUCCESS,
  TLoginFormActions,
} from '../actions/login-form';

interface TLoginFormState {
  email: string;
  password: string;
  request: boolean;
  failed: boolean;
  error: null | string;
}

const initState: TLoginFormState = {
  email: '',
  password: '',
  request: false,
  failed: false,
  error: null,
};

export const loginFormReducer = (state = initState, action: TLoginFormActions): TLoginFormState => {
  switch (action.type) {
    case LOGIN_FORM_SET_VALUE:
      return { ...state, failed: false, ...action.payload };
    case LOGIN_FORM_RESET_VALUES:
      return { ...initState };
    case LOGIN_FORM_REQUEST:
      return { ...state, request: true };
    case LOGIN_FORM_SUCCESS:
      return { ...state, request: false };
    case LOGIN_FORM_FAILED:
      return { ...state, request: false, failed: true, error: action.payload };
    default:
      return state;
  }
};
