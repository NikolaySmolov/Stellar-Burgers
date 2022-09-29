import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { store } from '../store';

export interface IFromLocation {
  from: {
    hash: string;
    pathname: string;
    search: string;
    state: unknown;
  };
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction //потом поменять на типы из стора
>;
