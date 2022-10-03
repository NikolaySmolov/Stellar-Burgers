import { RootState } from '../types';

export const selectUserAccessRequest = (store: RootState) => store.profile.getUserAccessRequest;

export const selectUserAccessFailed = (store: RootState) => store.profile.getUserAccessFailed;

export const selectUserLogoutRequest = (store: RootState) => store.profile.setUserLogoutRequest;

export const selectUserLogoutFailed = (store: RootState) => store.profile.setUserLogoutFailed;

export const selectUserInfo = (store: RootState) => store.profile.userInfo;

export const selectUserInfoForm = (store: RootState) => store.profile.userInfoForm;

export const selectUserInfoLoaded = (store: RootState) => store.profile.userInfoLoaded;

export const selectUserInfoRequest = (store: RootState) => store.profile.userInfoRequest;

export const selectUserInfoFailed = (store: RootState) => store.profile.userInfoFailed;
