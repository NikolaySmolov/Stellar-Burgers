import { BUN } from '../../utils/constants';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT,
  SORT_INGREDIENT,
  CLEAR_CONSTRUCTOR,
} from '../actions/burger';

const initialState = {
  // ingredients: [],
  // ingredientsRequest: false,
  // ingredientsFailed: false,
  constructor: { bun: [], filling: [] },
  // ingredientDetails: null,
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, ingredientsRequest: true };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.data.map(appendQuantity),
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    case INCREASE_INGREDIENT:
      const increasedIngredients = [...state.ingredients];
      const increasedConstructor = { ...state.constructor };

      const draggableItem = increasedIngredients.find(ing => ing._id === action.itemId);

      const draggedItem = { ...draggableItem };

      draggedItem.tempId = new Date().getTime() + draggableItem._id;

      if (draggedItem.type === BUN) {
        increasedConstructor.bun[0] = draggedItem;
        increasedIngredients.forEach(ing => (ing.type === BUN ? (ing.qty = 0) : null));
      } else {
        increasedConstructor.filling.push(draggedItem);
      }

      draggableItem.qty++;

      return {
        ...state,
        ingredients: increasedIngredients,
        constructor: increasedConstructor,
      };

    case DECREASE_INGREDIENT:
      const decreasedIngredients = [...state.ingredients];
      const decreasableItem = decreasedIngredients.find(ing => ing._id === action.payload.itemId);
      decreasableItem.qty--;

      const decreasedConstructor = state.constructor.filling.filter(
        (_, index) => index !== action.payload.itemPos
      );

      return {
        ...state,
        ingredients: decreasedIngredients,
        constructor: { ...state.constructor, filling: decreasedConstructor },
      };
    case SORT_INGREDIENT:
      const sortableItem = state.constructor.filling.find(
        (_, index) => index === action.payload.dragItemPos
      );

      const sortedFillings = [...state.constructor.filling].filter(
        (_, index) => index !== action.payload.dragItemPos
      );

      sortedFillings.splice(action.payload.dropTargetPos, 0, sortableItem);

      return { ...state, constructor: { ...state.constructor, filling: sortedFillings } };
    case CLEAR_CONSTRUCTOR:
      const clearedIngredients = [...state.ingredients];
      clearedIngredients.forEach(item => (item.qty = 0));

      return { ...state, ingredients: clearedIngredients, constructor: { bun: [], filling: [] } };
    default:
      return state;
  }
};

const appendQuantity = item => {
  item.qty = 0;
  return item;
};
