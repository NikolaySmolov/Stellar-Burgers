import { fetchResetPasswordCode, fetchSetNewPassword, IStatusResponse } from '../api-refactor';
import { AppDispatch } from '../types';
import { IEmail, IMailCode, IPassword, TResetPassword } from '../types/data';

export const RESET_PASS_FORM_REQUEST: 'RESET_PASS_FORM_REQUEST' = 'RESET_PASS_FORM_REQUEST';

export const RESET_PASS_FORM_GET_CODE_SUCCESS: 'RESET_PASS_FORM_GET_CODE_SUCCESS' =
  'RESET_PASS_FORM_GET_CODE_SUCCESS';

export const RESET_PASS_FORM_SET_PASS_SUCCESS: 'RESET_PASS_FORM_SET_PASS_SUCCESS' =
  'RESET_PASS_FORM_SET_PASS_SUCCESS';

export const RESET_PASS_FORM_FAILED: 'RESET_PASS_FORM_FAILED' = 'RESET_PASS_FORM_FAILED';

export const RESET_PASS_FORM_SET_VALUE: 'RESET_PASS_FORM_SET_VALUE' = 'RESET_PASS_FORM_SET_VALUE';

export const RESET_PASS_FORM_RESET_VALUES: 'RESET_PASS_FORM_RESET_VALUES' =
  'RESET_PASS_FORM_RESET_VALUES';

export const RESET_PASS_FORM_RESET_STATE: 'RESET_PASS_FORM_RESET_STATE' =
  'RESET_PASS_FORM_RESET_STATE';

interface IGetResetPassFormRequestAction {
  readonly type: typeof RESET_PASS_FORM_REQUEST;
}

interface IGetResetPassFormGetCodeSuccessAction {
  readonly type: typeof RESET_PASS_FORM_GET_CODE_SUCCESS;
}

interface IGetResetPassFormSetPassSuccessAction {
  readonly type: typeof RESET_PASS_FORM_SET_PASS_SUCCESS;
}

interface IGetResetPassFormFailedAction {
  readonly type: typeof RESET_PASS_FORM_FAILED;
  readonly payload: string;
}

interface IGetResetPassFormSetValueAction {
  readonly type: typeof RESET_PASS_FORM_SET_VALUE;
  readonly payload: Partial<IEmail & IPassword & IMailCode>;
}

interface IGetResetPassFormResetValuesAction {
  readonly type: typeof RESET_PASS_FORM_RESET_VALUES;
}

interface IGetResetPassFormResetState {
  readonly type: typeof RESET_PASS_FORM_RESET_STATE;
}

export type TResetPassFormActions =
  | IGetResetPassFormRequestAction
  | IGetResetPassFormGetCodeSuccessAction
  | IGetResetPassFormSetPassSuccessAction
  | IGetResetPassFormFailedAction
  | IGetResetPassFormSetValueAction
  | IGetResetPassFormResetValuesAction
  | IGetResetPassFormResetState;

export const getResetPassFormRequestAction = (): IGetResetPassFormRequestAction => ({
  type: RESET_PASS_FORM_REQUEST,
});

export const getResetPassFormGetCodeSuccessAction = (): IGetResetPassFormGetCodeSuccessAction => ({
  type: RESET_PASS_FORM_GET_CODE_SUCCESS,
});

export const getResetPassFormSetPassSuccessAction = (): IGetResetPassFormSetPassSuccessAction => ({
  type: RESET_PASS_FORM_SET_PASS_SUCCESS,
});

export const getResetPassFormFailedAction = (payload: string): IGetResetPassFormFailedAction => ({
  type: RESET_PASS_FORM_FAILED,
  payload,
});

export const getResetPassFormSetValueAction = (
  payload: Partial<IEmail & IPassword & IMailCode>
): IGetResetPassFormSetValueAction => ({
  type: RESET_PASS_FORM_SET_VALUE,
  payload,
});

export const getResetPassFormResetValuesAction = (): IGetResetPassFormResetValuesAction => ({
  type: RESET_PASS_FORM_RESET_VALUES,
});

export const getResetPassFormResetStateAction = (): IGetResetPassFormResetState => ({
  type: RESET_PASS_FORM_RESET_STATE,
});

export const getCodeForReset = (form: IEmail) => async (dispatch: AppDispatch) => {
  dispatch(getResetPassFormRequestAction());

  try {
    await fetchResetPasswordCode(form);
    dispatch(getResetPassFormGetCodeSuccessAction());
  } catch {
    dispatch(
      getResetPassFormFailedAction(
        'Произошла ошибка, попробуйте обновить страницу и\xA0отправить форму повторно'
      )
    );
  }
};

export const setNewPassword =
  (form: TResetPassword<IPassword & IMailCode>) => async (dispatch: AppDispatch) => {
    dispatch(getResetPassFormRequestAction);

    try {
      const res = await fetchSetNewPassword(form);
      if (res.message === 'Password successfully reset') {
        dispatch(getResetPassFormSetPassSuccessAction());
      } else {
        debugger;
        throw new Error('error text');
      }
    } catch (err) {
      if ((err as IStatusResponse).message === 'Invalid credentials provided') {
        dispatch(getResetPassFormFailedAction('Заполните все поля'));
      } else if ((err as IStatusResponse).message === 'Incorrect reset token') {
        dispatch(getResetPassFormFailedAction('Неверный код из письма'));
      } else {
        dispatch(
          getResetPassFormFailedAction(
            'Произошла ошибка, попробуйте обновить страницу и\xA0отправить форму повторно'
          )
        );
      }
    }
  };
