import { burgerReducer } from './burger';
import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { registrationReducer } from './register';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  registration: registrationReducer,
});
