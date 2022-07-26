import { requireOrder } from '../../utils/api';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';

export const SET_TOTALPRICE = 'SET_TOTALPRICE';

export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export const sendOrder = array => dispatch => {
  dispatch({ type: ORDER_REQUEST });

  requireOrder(array)
    .then(res => dispatch({ type: ORDER_SUCCESS, orderDetails: res }))
    .catch(err => {
      console.log(err);
      dispatch({ type: ORDER_FAILED });
    });
};
