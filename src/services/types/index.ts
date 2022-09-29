import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { store } from '../store';

export type TLocation<S extends 'from' | 'background'> = {
  [key in S]: {
    hash: string;
    pathname: string;
    search: string;
    state: unknown;
  };
};

export interface IParamsForId {
  id: string;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction //потом поменять на типы из стора
>;
