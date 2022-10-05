import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { registrationFormReducer } from './registration-form';
import { loginFormReducer } from './login-form';
import { resetPasswordFormReducer } from './reset-password-form';
import { userReducer } from './user';
import { wsReducer } from './web-socket';
import { constructorReducer } from './constructor';
import { authReducer } from './auth';
import { profileFormReducer } from './profile-form';

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  registrationForm: registrationFormReducer,
  loginForm: loginFormReducer,
  resetPasswordForm: resetPasswordFormReducer,
  profileForm: profileFormReducer,
  user: userReducer,
  feed: wsReducer,
});
