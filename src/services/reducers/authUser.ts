import {
  AUTH_CHECKED,
  TGetUserActions,
  USER_GET_INFO_FAILED,
  USER_GET_INFO_REQUEST,
  USER_GET_INFO_SUCCESS,
} from '../actions/authUser';

interface IInitState {
  name: string | null;
  email: string | null;
  request: boolean;
  success: boolean;
  failed: boolean;
  authChecked: boolean;
}

const initState: IInitState = {
  name: null,
  email: null,
  request: false,
  success: false,
  failed: false,
  authChecked: false,
};

export const authReducer = (state = initState, action: TGetUserActions) => {
  switch (action.type) {
    case AUTH_CHECKED:
      return { ...state, authChecked: true };
    case USER_GET_INFO_REQUEST:
      return { ...state, request: true, success: false, failed: false };
    case USER_GET_INFO_SUCCESS:
      return { ...state, request: false, success: true, ...action.payload };
    case USER_GET_INFO_FAILED:
      return { ...state, request: false, success: false, failed: true, name: null, email: null };
    default:
      return state;
  }
};
