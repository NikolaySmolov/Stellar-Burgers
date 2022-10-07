import { fetchMakeOrder } from '../api';
import { AppDispatch, RootState } from '../types';

export const ORDER_REQUEST: 'ORDER_REQUEST' = 'ORDER_REQUEST';
export const ORDER_SUCCESS: 'ORDER_SUCCESS' = 'ORDER_SUCCESS';
export const ORDER_FAILED: 'ORDER_FAILED' = 'ORDER_FAILED';
export const ORDER_CLOSE_DETAILS: 'ORDER_CLOSE_DETAILS' = 'ORDER_CLOSE_DETAILS';

export interface IGetOrderRequestAction {
  readonly type: typeof ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof ORDER_SUCCESS;
  payload: number;
}

export interface IGetOrderFailedAction {
  readonly type: typeof ORDER_FAILED;
  payload: string;
}

export interface IGetOrderCloseDetailsAction {
  readonly type: typeof ORDER_CLOSE_DETAILS;
}

export type TOrderActions =
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IGetOrderCloseDetailsAction;

export const getOrderRequestAction = (): IGetOrderRequestAction => ({
  type: ORDER_REQUEST,
});
export const getOrderSuccessAction = (payload: number): IGetOrderSuccessAction => ({
  type: ORDER_SUCCESS,
  payload,
});
export const getOrderFailedAction = (payload: string): IGetOrderFailedAction => ({
  type: ORDER_FAILED,
  payload,
});
export const getOrderCloseDetailsAction = (): IGetOrderCloseDetailsAction => ({
  type: ORDER_CLOSE_DETAILS,
});

export const makeOrderAction = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { burgerConstructor } = getState();
  const burgerIngredients = [...burgerConstructor.bun, ...burgerConstructor.filling].map(
    ingredient => ingredient._id
  );

  dispatch(getOrderRequestAction());

  try {
    const res = await fetchMakeOrder(burgerIngredients);
    dispatch(getOrderSuccessAction(res.order.number));
  } catch (err) {
    console.log('Order does not send', err);
    dispatch(
      getOrderFailedAction(
        'Не удалось отправить заказ. Попробуйте обновить страницу и\xA0повторить заказ'
      )
    );
  }
};
