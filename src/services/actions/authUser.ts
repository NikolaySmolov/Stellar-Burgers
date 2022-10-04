import { fetchUserInfo } from '../api-rafactor';
import { AppDispatch } from '../types';
import { IUser } from '../types/data';

export const AUTH_CHECKED: 'AUTH_CHECKED' = 'AUTH_CHECKED';

export const USER_GET_INFO_REQUEST: 'USER_GET_INFO_REQUEST' = 'USER_GET_INFO_REQUEST';
export const USER_GET_INFO_SUCCESS: 'USER_GET_INFO_SUCCESS' = 'USER_GET_INFO_SUCCESS';
export const USER_GET_INFO_FAILED: 'USER_GET_INFO_FAILED' = 'USER_GET_INFO_FAILED';

interface IAuthCheckedAction {
  readonly type: typeof AUTH_CHECKED;
}

interface IGetUserAction {
  readonly type: typeof USER_GET_INFO_REQUEST;
}

interface IGetUserSuccessAction {
  readonly type: typeof USER_GET_INFO_SUCCESS;
  readonly payload: {
    email: string;
    name: string;
  };
}

interface IGetUserFailedAction {
  readonly type: typeof USER_GET_INFO_FAILED;
}

export type TGetUserActions =
  | IAuthCheckedAction
  | IGetUserAction
  | IGetUserSuccessAction
  | IGetUserFailedAction;

export const getCheckedAction = (): IAuthCheckedAction => ({
  type: AUTH_CHECKED,
});

export const getUserAction = (): IGetUserAction => ({
  type: USER_GET_INFO_REQUEST,
});

export const getUserSuccessAction = (payload: IUser): IGetUserSuccessAction => ({
  type: USER_GET_INFO_SUCCESS,
  payload,
});

export const getUserFailedAction = (): IGetUserFailedAction => ({
  type: USER_GET_INFO_FAILED,
});

export const getUserInfo = () => async (dispatch: AppDispatch) => {
  dispatch(getUserAction());

  try {
    const res = await fetchUserInfo();
    dispatch(getUserSuccessAction(res.user));
  } catch {
    dispatch(getUserFailedAction());
  } finally {
    dispatch(getCheckedAction());
  }
};
