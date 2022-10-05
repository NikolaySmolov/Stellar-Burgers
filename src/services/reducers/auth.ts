import {
  AUTH_CHECKED,
  TAuthActions,
  AUTH_FAILED,
  AUTH_REQUEST,
  AUTH_SUCCESS,
} from '../actions/auth';

interface IAuthState {
  name: string | null;
  email: string | null;
  request: boolean;
  failed: boolean;
  authChecked: boolean;
}

const initState: IAuthState = {
  name: null,
  email: null,
  request: false,
  failed: false,
  authChecked: false, //пока не понимаю как применить
};

export const authReducer = (state = initState, action: TAuthActions): IAuthState => {
  switch (action.type) {
    case AUTH_CHECKED: //пока не понятно зачем
      return { ...state, authChecked: true };
    case AUTH_REQUEST:
      return { ...state, request: true };
    case AUTH_SUCCESS:
      return { ...state, request: false, failed: false, ...action.payload };
    case AUTH_FAILED:
      return { ...state, request: false, failed: true, name: null, email: null };
    default:
      return state;
  }
};
