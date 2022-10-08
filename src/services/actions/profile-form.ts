import { fetchSetProfileData, IStatusResponse } from '../api';
import { AppDispatch, AppThunk } from '../types';
import { TProfileForm } from '../types/data';
import { getAuthSuccessAction } from './auth';

export const PROFILE_FORM_REQUEST: 'PROFILE_FORM_REQUEST' = 'PROFILE_FORM_REQUEST';
export const PROFILE_FORM_SUCCESS: 'PROFILE_FORM_SUCCESS' = 'PROFILE_FORM_SUCCESS';
export const PROFILE_FORM_FAILED: 'PROFILE_FORM_FAILED' = 'PROFILE_FORM_FAILED';
export const PROFILE_FORM_SET_VALUE: 'PROFILE_FORM_SET_VALUE' = 'PROFILE_FORM_SET_VALUE';
export const PROFILE_FORM_RESET_VALUES: 'PROFILE_FORM_RESET_VALUES' = 'PROFILE_FORM_RESET_VALUES';

interface IGetProfileFormRequestAction {
  readonly type: typeof PROFILE_FORM_REQUEST;
}

interface IGetProfileFormSuccessAction {
  readonly type: typeof PROFILE_FORM_SUCCESS;
}

interface IGetProfileFormFailedAction {
  readonly type: typeof PROFILE_FORM_FAILED;
  readonly payload: string;
}

interface IGetProfileFormSetValueAction {
  readonly type: typeof PROFILE_FORM_SET_VALUE;
  readonly payload: Partial<TProfileForm>;
}

interface IGetProfileFormResetValuesAction {
  readonly type: typeof PROFILE_FORM_RESET_VALUES;
  readonly payload: TProfileForm;
}

export type TProfileFormActions =
  | IGetProfileFormRequestAction
  | IGetProfileFormSuccessAction
  | IGetProfileFormFailedAction
  | IGetProfileFormSetValueAction
  | IGetProfileFormResetValuesAction;

export const getProfileFormRequestAction = (): IGetProfileFormRequestAction => ({
  type: PROFILE_FORM_REQUEST,
});

export const getProfileFormSuccessAction = (): IGetProfileFormSuccessAction => ({
  type: PROFILE_FORM_SUCCESS,
});

export const getProfileFormFailedAction = (payload: string): IGetProfileFormFailedAction => ({
  type: PROFILE_FORM_FAILED,
  payload,
});

export const getProfileFormSetValueAction = (
  payload: Partial<TProfileForm>
): IGetProfileFormSetValueAction => ({
  type: PROFILE_FORM_SET_VALUE,
  payload,
});

export const getProfileFormResetValuesAction = (
  payload: TProfileForm
): IGetProfileFormResetValuesAction => ({
  type: PROFILE_FORM_RESET_VALUES,
  payload,
});

export const setNewProfileData: AppThunk =
  (form: TProfileForm) => async (dispatch: AppDispatch) => {
    dispatch(getProfileFormRequestAction());

    try {
      const res = await fetchSetProfileData(form);
      dispatch(getAuthSuccessAction(res.user));
      dispatch(getProfileFormSuccessAction());
    } catch (err) {
      if ((err as IStatusResponse).message === 'User with such email already exists') {
        dispatch(getProfileFormFailedAction('Пользователь с таким email уже зарегистрирован'));
      }
      console.log(err);
    }
  };
