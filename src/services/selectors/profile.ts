import { RootState } from '../types';

export const selectUserAccessRequest = (store: RootState) => store.profile.getUserAccessRequest;

export const selectUserAccessFailed = (store: RootState) => store.profile.getUserAccessFailed;
