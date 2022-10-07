import { RootState } from '../types';

export const selectAuthState = (store: RootState) => store.auth;
