import { burgerReducer } from './burger';
import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { registrationReducer } from './register';
import { loginReducer } from './login';
import { forgotPasswordReducer } from './forgot-password';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  registration: registrationReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
});
