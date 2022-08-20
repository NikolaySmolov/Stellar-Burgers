import { burgerReducer } from './burger';
import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { registrationReducer } from './register';
import { loginReducer } from './login';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  registration: registrationReducer,
  login: loginReducer,
});
