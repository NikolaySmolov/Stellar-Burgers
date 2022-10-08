import { IIngredient } from '../../utils/types';
import {
  INGREDIENTS_FAILED,
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  TIngredientsActions,
} from '../actions/ingredients';

interface IIngredientsState {
  ingredients: ReadonlyArray<IIngredient>;
  request: boolean;
  failed: boolean;
  error: null | string;
}

const initState: IIngredientsState = {
  ingredients: [],
  request: false,
  failed: false,
  error: null,
};

export const ingredientsReducer = (
  state = initState,
  action: TIngredientsActions
): IIngredientsState => {
  switch (action.type) {
    case INGREDIENTS_REQUEST:
      return { ...state, request: true };
    case INGREDIENTS_SUCCESS:
      return { ...state, request: false, failed: false, ingredients: action.payload };
    case INGREDIENTS_FAILED:
      return { ...state, request: false, failed: true, error: action.payload };
    default:
      return state;
  }
};
