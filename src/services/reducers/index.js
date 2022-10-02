import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { registrationReducer } from './register';
import { loginReducer } from './login';
import { forgotPasswordReducer } from './forgot-password';
import { profileReducer } from './profile';
import { wsReducer } from './web-socket';
import { constructorReducer } from './constructor';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  registration: registrationReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  profile: profileReducer,
  feed: wsReducer,
});
