import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TAuthActions } from '../actions/auth';
import { TConstructorActions } from '../actions/constructor';
import { TIngredientsActions } from '../actions/ingredients';
import { TLoginFormActions } from '../actions/login-form';
import { TOrderActions } from '../actions/order';
import { TProfileFormActions } from '../actions/profile-form';
import { TRegistrationFormActions } from '../actions/registration-form';
import { TResetPassFormActions } from '../actions/reset-password-form';
import { TWebSocketActions } from '../actions/web-socket';
import { rootReducer } from '../reducers';

export type TApplicationActions =
  | TAuthActions
  | TConstructorActions
  | TIngredientsActions
  | TLoginFormActions
  | TOrderActions
  | TProfileFormActions
  | TRegistrationFormActions
  | TResetPassFormActions
  | TWebSocketActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = Dispatch<TApplicationActions>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, unknown, TApplicationActions>
>;
