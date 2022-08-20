import PropTypes from 'prop-types';

export const API = 'https://norma.nomoreparties.space/api';

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

export const ingredientDetails = PropTypes.shape({
  name: PropTypes.string,
  image_large: PropTypes.string,
  price: PropTypes.number,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
});

export const refPropTypes = PropTypes.shape({
  current: PropTypes.object,
});

export const OPEN = 'open';
export const CLOSE = 'close';
export const BUN = 'bun';
export const FILLING = 'filling';
export const CALC = 'calc';
export const ADD = 'add';
export const SORT = 'sort';

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
