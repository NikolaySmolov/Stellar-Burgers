import { ACTION_TYPES } from '../actions/ingredients';

const initialState = {
  ingredients: [],
  request: false,
  failed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.REQUEST:
      return { ...state, request: true, failed: false };
    case ACTION_TYPES.SUCCESS:
      return { ...state, request: false, failed: false, ingredients: action.payload };
    case ACTION_TYPES.FAILED:
      return { ...state, request: false, failed: true };
    default:
      return state;
  }
};
