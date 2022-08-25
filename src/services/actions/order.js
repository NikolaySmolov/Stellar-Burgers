import {
  ACCESS_TOKEN,
  TOKEN,
  ORDER_ACCESS_SUCCESS,
  ORDER_ACCESS_FAILED,
} from '../../utils/constants';
import { getRefreshToken, requireOrder } from '../api';
import { getCookie, setCookie } from '../utils';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';

export const SET_TOTALPRICE = 'SET_TOTALPRICE';

export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export const setOrderAccessSuccess = () => ({
  type: ORDER_ACCESS_SUCCESS,
});

export const setOrderAccessFailed = () => ({
  type: ORDER_ACCESS_FAILED,
});

export const sendOrder = array => async dispatch => {
  if (!getCookie(TOKEN)) {
    dispatch(setOrderAccessFailed());
  } else {
    dispatch({ type: ORDER_REQUEST });

    let setOrderRes, getAccessRes;

    setOrderRes = await requireOrder(getCookie(ACCESS_TOKEN), array)
      .then(res => {
        dispatch({ type: ORDER_SUCCESS, orderDetails: res });
      })
      .catch(err => {
        console.log(err);
        return err;
      });

    if (setOrderRes?.status === 403 && getCookie(TOKEN)) {
      getAccessRes = await getRefreshToken(getCookie(TOKEN))
        .then(data => {
          const accessToken = data.accessToken.split('Bearer ')[1];
          const token = data.refreshToken;

          setCookie(ACCESS_TOKEN, accessToken, { 'max-age': 1200 });
          setCookie(TOKEN, token);
          return { success: true };
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    }

    if (getAccessRes?.success) {
      setOrderRes = await requireOrder(getCookie(ACCESS_TOKEN), array)
        .then(res => {
          dispatch({ type: ORDER_SUCCESS, orderDetails: res });
        })
        .catch(err => {
          console.log(err);
          dispatch({ type: ORDER_FAILED });
          return err;
        });
    } else if (getAccessRes?.status === 401) {
      dispatch(setOrderAccessFailed());
    }
  }
};
