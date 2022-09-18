import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { orderReducer } from './order';
import { registrationReducer } from './register';
import { loginReducer } from './login';
import { forgotPasswordReducer } from './forgot-password';
import { profileReducer } from './profile';
import { wsReducer } from './web-socket';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  registration: registrationReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  profile: profileReducer,
  orders: wsReducer,
});
