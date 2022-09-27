import PropTypes from 'prop-types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CLEAR_STORE,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
} from '../services/actions/web-socket';

export const API = 'https://norma.nomoreparties.space/api';

export const WS = 'wss://norma.nomoreparties.space/orders';

export const WS_ACTIONS = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  wsClearStore: WS_CLEAR_STORE,
  onOpen: WS_CONNECTION_SUCCESS,
  onMessage: WS_GET_MESSAGE,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
};

export const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  proteins: PropTypes.number,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  count: PropTypes.number,
});

export const refPropTypes = PropTypes.shape({
  current: PropTypes.object,
});

export type TIngredientType = typeof BUN | typeof SAUCE | typeof MAIN;

export interface IIngredient {
  _id: string;
  name: string;
  type: TIngredientType;
  price: number;
  image: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  proteins: number;
  image_large: string;
  image_mobile: string;
}

export const OPEN = 'open';
export const CLOSE = 'close';
export const BUN: 'bun' = 'bun';
export const SAUCE: 'sauce' = 'sauce';
export const MAIN: 'main' = 'main';
export const FILLING = 'filling';
export const CALC = 'calc';
export const ADD = 'add';
export const SORT = 'sort';
export const CREATED = 'created';
export const PENDING = 'pending';
export const DONE = 'done';

export const ACCESS_TOKEN = 'accessToken';
export const TOKEN = 'token';

export const FAKE_PASSWORD = '******';

export const ORDER_PATH = '/order/';

export const REGISTER_FORM_SET_VALUE = 'REGISTER_FORM_GET_VALUE';
export const REGISTER_FORM_RESET_VALUES = 'REGISTER_FORM_RESET_VALUES';
export const REGISTER_FORM_SUBMIT = 'REGISTER_FORM_SUBMIT';
export const REGISTER_FORM_SUCCESS = 'REGISTER_FORM_SUCCESS';
export const REGISTER_FORM_FAILED = 'REGISTER_FORM_FAILED';

export const LOGIN_FORM_SET_VALUE = 'LOGIN_FORM_GET_VALUE';
export const LOGIN_FORM_RESET_VALUES = 'LOGIN_FORM_RESET_VALUES';
export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT';
export const LOGIN_FORM_SUCCESS = 'LOGIN_FORM_SUCCESS';
export const LOGIN_FORM_FAILED = 'LOGIN_FORM_FAILED';

export const FORGOT_PASSWORD_FORM_VALUE = 'FORGOT_PASSWORD_FORM_VALUE';
export const FORGOT_PASSWORD_FORM_RESET_VALUES = 'FORGOT_PASSWORD_FORM_RESET_VALUES';
export const FORGOT_PASSWORD_GET_CODE_SUBMIT = 'FORGOT_PASSWORD_GET_CODE_SUBMIT';
export const FORGOT_PASSWORD_GET_CODE_SUCCESS = 'FORGOT_PASSWORD_GET_CODE_SUCCESS';
export const FORGOT_PASSWORD_GET_CODE_RESET = 'FORGOT_PASSWORD_GET_CODE_RESET';
export const FORGOT_PASSWORD_GET_CODE_FAILED = 'FORGOT_PASSWORD_GET_CODE_FAILED';
export const FORGOT_PASSWORD_SET_PASSWORD_SUBMIT = 'FORGOT_PASSWORD_SET_PASSWORD_SUBMIT';
export const FORGOT_PASSWORD_SET_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SET_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_SET_PASSWORD_FAILED = 'FORGOT_PASSWORD_SET_PASSWORD_FAILED';

export const PROFILE_USER_INFO_REQUEST = 'PROFILE_USER_INFO_REQUEST';
export const PROFILE_USER_INFO_SUCCESS = 'PROFILE_USER_INFO_SUCCESS';
export const PROFILE_USER_INFO_FAILED = 'PROFILE_USER_INFO_FAILED';

export const PROFILE_USER_INFO_FORM_VALUE = 'PROFILE_USER_INFO_FORM_VALUE';
export const PROFILE_USER_INFO_FORM_RESET = 'PROFILE_USER_INFO_FORM_RESET';
export const PROFILE_USER_INFO_FORM_SUBMIT = 'PROFILE_USER_INFO_FORM_SUBMIT';
export const PROFILE_USER_INFO_FORM_SUCCESS = 'PROFILE_USER_INFO_FORM_SUCCESS';
export const PROFILE_USER_INFO_FORM_FAILED = 'PROFILE_USER_INFO_FORM_FAILED';

export const USER_ACCESS_REQUEST = 'USER_ACCESS_REQUEST';
export const USER_ACCESS_SUCCESS = 'USER_ACCESS_SUCCESS';
export const USER_ACCESS_FAILED = 'USER_ACCESS_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';
