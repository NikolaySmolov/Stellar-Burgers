import { fetchUserInfo } from '../api-rafactor';
import { AppDispatch } from '../types';
import { TUserInfo } from '../types/data';

export const AUTH_CHECKED: 'AUTH_CHECKED' = 'AUTH_CHECKED';

export const AUTH_REQUEST: 'AUTH_REQUEST' = 'AUTH_REQUEST';
export const AUTH_SUCCESS: 'AUTH_SUCCESS' = 'AUTH_SUCCESS';
export const AUTH_FAILED: 'AUTH_FAILED' = 'AUTH_FAILED';

interface IAuthCheckedAction {
  readonly type: typeof AUTH_CHECKED;
}

interface IGetAuthRequestAction {
  readonly type: typeof AUTH_REQUEST;
}

interface IGetAuthSuccessAction {
  readonly type: typeof AUTH_SUCCESS;
  readonly payload: {
    email: string;
    name: string;
  };
}

interface IGetAuthFailedAction {
  readonly type: typeof AUTH_FAILED;
}

export type TAuthActions =
  | IAuthCheckedAction
  | IGetAuthRequestAction
  | IGetAuthSuccessAction
  | IGetAuthFailedAction;

export const getCheckedAction = (): IAuthCheckedAction => ({
  type: AUTH_CHECKED,
});

export const getAuthRequestAction = (): IGetAuthRequestAction => ({
  type: AUTH_REQUEST,
});

export const getAuthSuccessAction = (payload: TUserInfo): IGetAuthSuccessAction => ({
  type: AUTH_SUCCESS,
  payload,
});

export const getAuthFailedAction = (): IGetAuthFailedAction => ({
  type: AUTH_FAILED,
});

export const getUserInfo = () => async (dispatch: AppDispatch) => {
  dispatch(getAuthRequestAction());

  try {
    const res = await fetchUserInfo();
    dispatch(getAuthSuccessAction(res.user));
  } catch {
    dispatch(getAuthFailedAction());
  } finally {
    dispatch(getCheckedAction());
  }
};
