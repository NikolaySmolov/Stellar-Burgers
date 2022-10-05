import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { registrationFormReducer } from './registration-form';
import { loginFormReducer } from './login-form';
import { forgotPasswordReducer } from './forgot-password';
import { userReducer } from './user';
import { wsReducer } from './web-socket';
import { constructorReducer } from './constructor';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  registrationForm: registrationFormReducer,
  loginForm: loginFormReducer,
  forgotPassword: forgotPasswordReducer,
  user: userReducer,
  feed: wsReducer,
});
