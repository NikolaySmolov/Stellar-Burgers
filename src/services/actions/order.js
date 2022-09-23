import { ACCESS_TOKEN, TOKEN } from '../../utils/constants';
import { getRefreshToken, requireOrder } from '../api';
import { getCookie, setCookie } from '../utils';

const index = 'ORDER';

export const ACTION_TYPES = {
  REQUEST: `${index}/REQUEST`,
  SUCCESS: `${index}/SUCCESS`,
  FAILED: `${index}/FAILED`,
  RESET: `${index}/RESET`,
  CLOSE_DETAILS: `${index}/CLOSE_DETAILS`,
  PERMISSION_SUCCESS: `${index}/PERMISSION_SUCCESS`,
  PERMISSION_FAILED: `${index}/PERMISSION_FAILED`,
};

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';

export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export const closeOrderDetails = () => ({
  type: ACTION_TYPES.CLOSE_DETAILS,
});

export const setOrderPermissionSuccess = () => ({
  type: ACTION_TYPES.PERMISSION_SUCCESS,
});

export const setOrderPermissionFailed = () => ({
  type: ACTION_TYPES.PERMISSION_FAILED,
});

export const sendOrder = array => async dispatch => {
  if (!getCookie(TOKEN)) {
    dispatch(setOrderPermissionFailed());
  } else {
    dispatch({ type: ACTION_TYPES.REQUEST });

    let setOrderRes, getAccessRes;

    setOrderRes = await requireOrder(getCookie(ACCESS_TOKEN), array)
      .then(res => {
        dispatch({ type: ACTION_TYPES.SUCCESS, payload: res });
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
    } else if (setOrderRes?.status === 404) {
      dispatch({ type: ACTION_TYPES.FAILED });
    }

    if (getAccessRes?.success) {
      setOrderRes = await requireOrder(getCookie(ACCESS_TOKEN), array)
        .then(res => {
          dispatch({ type: ACTION_TYPES.SUCCESS, payload: res });
        })
        .catch(err => {
          console.log(err);
          dispatch({ type: ACTION_TYPES.FAILED });
          return err;
        });
    } else if (getAccessRes?.status === 401) {
      dispatch(setOrderPermissionFailed());
    }
  }
};
