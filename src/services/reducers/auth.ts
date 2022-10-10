import {
  AUTH_CHECKED,
  TAuthActions,
  AUTH_FAILED,
  AUTH_REQUEST,
  AUTH_SUCCESS,
} from '../actions/auth';

interface IAuthState {
  name: string;
  email: string;
  request: boolean;
  failed: boolean;
  authChecked: boolean;
}

const initState: IAuthState = {
  name: '',
  email: '',
  request: false,
  failed: false,
  authChecked: false,
};

export const authReducer = (state = initState, action: TAuthActions): IAuthState => {
  switch (action.type) {
    case AUTH_CHECKED:
      return { ...state, authChecked: true };
    case AUTH_REQUEST:
      return { ...state, request: true };
    case AUTH_SUCCESS:
      return { ...state, request: false, failed: false, ...action.payload };
    case AUTH_FAILED:
      return { ...state, request: false, failed: true, name: '', email: '' };
    default:
      //eslint-disable-next-line
      const _exhaustiveCheck: never = action;
      return state;
  }
};
