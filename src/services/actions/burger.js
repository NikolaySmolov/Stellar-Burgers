import { requireIngredients } from '../api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT';
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT';
export const SORT_INGREDIENT = 'SORT_INGREDIENT';

export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const getIngredients = () => {
  return dispatch => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });

    requireIngredients()
      .then(res => {
        dispatch({ type: GET_INGREDIENTS_SUCCESS, data: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_INGREDIENTS_FAILED });
        console.log(err);
      });
  };
};
