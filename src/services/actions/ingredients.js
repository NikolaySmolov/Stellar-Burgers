import { requireIngredients } from '../api';

const index = 'INGREDIENTS';

export const ACTION_TYPES = {
  REQUEST: `${index}/REQUEST`,
  SUCCESS: `${index}/SUCCESS`,
  FAILED: `${index}/FAILED`,
};

export const getIngredients = () => dispatch => {
  dispatch({ type: ACTION_TYPES.REQUEST });

  requireIngredients()
    .then(res => {
      dispatch({ type: ACTION_TYPES.SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ACTION_TYPES.FAILED });
      console.log(err);
    });
};
