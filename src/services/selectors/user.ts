import { RootState } from '../types';

export const selectUserAccessRequest = (store: RootState) => store.user.getUserAccessRequest;

export const selectUserAccessFailed = (store: RootState) => store.user.getUserAccessFailed;

export const selectUserLogoutRequest = (store: RootState) => store.user.setUserLogoutRequest;

export const selectUserLogoutFailed = (store: RootState) => store.user.setUserLogoutFailed;

export const selectUserInfo = (store: RootState) => store.user.userInfo;

export const selectUserInfoForm = (store: RootState) => store.user.userInfoForm;

export const selectUserInfoLoaded = (store: RootState) => store.user.userInfoLoaded;

export const selectUserInfoRequest = (store: RootState) => store.user.userInfoRequest;

export const selectUserInfoFailed = (store: RootState) => store.user.userInfoFailed;
