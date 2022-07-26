import { burgerReducer } from './burger';
import { combineReducers } from 'redux';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
});
