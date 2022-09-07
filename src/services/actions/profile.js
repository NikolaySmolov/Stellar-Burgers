import {
  PROFILE_USER_INFO_FORM_RESET,
  PROFILE_USER_INFO_FORM_SUBMIT,
  PROFILE_USER_INFO_FORM_SUCCESS,
  PROFILE_USER_INFO_FORM_VALUE,
  PROFILE_USER_INFO_REQUEST,
  PROFILE_USER_INFO_SUCCESS,
  PROFILE_USER_INFO_FAILED,
  USER_ACCESS_FAILED,
  USER_ACCESS_REQUEST,
  ACCESS_TOKEN,
  TOKEN,
  USER_ACCESS_SUCCESS,
  PROFILE_USER_INFO_FORM_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
} from '../../utils/constants';
import { getProfileInfo, getRefreshToken, setLogout, setProfileInfo } from '../api';
import { deleteCookie, setCookie } from '../utils';

export const getUserAccess = (token) => (dispatch) => {
  dispatch({ type: USER_ACCESS_REQUEST });

  getRefreshToken(token)
    .then((data) => {
      const accessToken = data.accessToken.split('Bearer ')[1];
      const token = data.refreshToken;

      setCookie(ACCESS_TOKEN, accessToken, { 'max-age': 1200 });
      setCookie(TOKEN, token);

      dispatch({ type: USER_ACCESS_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: USER_ACCESS_FAILED });
    });
};

export const getUserProfileInfo = (accessToken) => (dispatch) => {
  dispatch({ type: PROFILE_USER_INFO_REQUEST });

  getProfileInfo(accessToken)
    .then(({ user }) => dispatch({ type: PROFILE_USER_INFO_SUCCESS, payload: user }))
    .catch((err) => {
      if (err.status === 403) {
        dispatch({ type: USER_ACCESS_FAILED });
      }
      dispatch({ type: PROFILE_USER_INFO_FAILED });
      console.log(err);
    });
};

export const setProfileUserInfoFormValue = (field, value) => ({
  type: PROFILE_USER_INFO_FORM_VALUE,
  payload: { [field]: value },
});

export const setProfileUserInfoFormReset = () => ({
  type: PROFILE_USER_INFO_FORM_RESET,
});

export const setUserProfileInfo = (accessToken, form) => (dispatch) => {
  dispatch({ type: PROFILE_USER_INFO_FORM_SUBMIT });

  setProfileInfo(accessToken, form)
    .then(({ user }) => dispatch({ type: PROFILE_USER_INFO_FORM_SUCCESS, payload: user }))
    .catch((err) => {
      if (err.status === 403) {
        dispatch({ type: USER_ACCESS_FAILED });
      }
      dispatch({ type: PROFILE_USER_INFO_FORM_FAILED });
      console.log(err);
    });
};

export const setUserLogout = (token) => (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });

  setLogout(token)
    .then(() => {
      dispatch({ type: USER_LOGOUT_SUCCESS });
      deleteCookie(TOKEN);
      deleteCookie(ACCESS_TOKEN);
    })
    .catch((err) => console.log(err));
};
