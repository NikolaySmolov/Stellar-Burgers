import { RootState } from '../types';

export const selectUserAccessRequest = (store: RootState) => store.profile.getUserAccessRequest;

export const selectUserAccessFailed = (store: RootState) => store.profile.getUserAccessFailed;

export const selectUserLogoutRequest = (store: RootState) => store.profile.setUserLogoutRequest;

export const selectUserLogoutFailed = (store: RootState) => store.profile.setUserLogoutFailed;
