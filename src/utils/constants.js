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

export const AUTH_FORM_SET_VALUE = 'AUTH_FORM_GET_VALUE';

export const AUTH_FORM_SUBMIT = 'AUTH_REGISTER_FORM_SUBMIT';
export const AUTH_FORM_SUCCESS = 'AUTH_REGISTER_FORM_SUCCESS';
export const AUTH_FORM_FAILED = 'AUTH_REGISTER_FORM_FAILED';
