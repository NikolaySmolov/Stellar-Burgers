import {
  PROFILE_USER_INFO_REQUEST,
  PROFILE_USER_INFO_SUCCESS,
  PROFILE_USER_INFO_FAILED,
  PROFILE_USER_INFO_FORM_FAILED,
  PROFILE_USER_INFO_FORM_RESET,
  PROFILE_USER_INFO_FORM_SUBMIT,
  PROFILE_USER_INFO_FORM_SUCCESS,
  PROFILE_USER_INFO_FORM_VALUE,
  USER_ACCESS_FAILED,
  USER_ACCESS_REQUEST,
  USER_ACCESS_SUCCESS,
  FAKE_PASSWORD,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
} from '../../utils/constants';

const initialState = {
  userInfo: {
    name: '',
    email: '',
  },
  userInfoForm: {
    name: '',
    email: '',
    password: FAKE_PASSWORD,
  },
  userInfoLoaded: false,
  getUserInfoRequest: false,
  getUserInfoFailed: false,
  setUserInfoRequest: false,
  setUserInfoFailed: false,
  getUserAccessRequest: false,
  getUserAccessFailed: false,
  setUserLogoutRequest: false,
  setUserLogoutFailed: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_USER_INFO_REQUEST:
      return {
        ...state,
        userInfoLoaded: false,
        getUserInfoRequest: true,
        getUserInfoFailed: false,
      };
    case PROFILE_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...action.payload,
        },
        userInfoForm: { ...state.userInfoForm, ...action.payload },
        userInfoLoaded: true,
        getUserInfoRequest: false,
        getUserInfoFailed: false,
      };
    case PROFILE_USER_INFO_FAILED:
      return {
        ...state,
        userInfo: {
          ...initialState.userInfo,
        },
        userInfoForm: { ...initialState.userInfoForm },
        userInfoLoaded: false,
        getUserInfoRequest: false,
        getUserInfoFailed: true,
      };
    case PROFILE_USER_INFO_FORM_VALUE:
      return {
        ...state,
        userInfoForm: {
          ...state.userInfoForm,
          ...action.payload,
        },
      };
    case PROFILE_USER_INFO_FORM_RESET:
      return {
        ...state,
        userInfoForm: {
          ...state.userInfoForm,
          name: state.userInfo.name,
          email: state.userInfo.email,
          password: initialState.userInfoForm.password,
        },
      };
    case PROFILE_USER_INFO_FORM_SUBMIT:
      return { ...state, userInfoForm: { ...state.userInfoForm }, setUserInfoRequest: true };

    case PROFILE_USER_INFO_FORM_SUCCESS:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
        userInfoForm: { ...state.userInfoForm, password: initialState.userInfoForm.password },
        setUserInfoRequest: false,
        userInfoLoaded: true,
      };
    case PROFILE_USER_INFO_FORM_FAILED:
      return {
        ...state,
        userInfoForm: { ...state.userInfoForm },
        setUserInfoRequest: false,
        setUserInfoFailed: true,
      };
    case USER_ACCESS_REQUEST:
      return {
        ...state,
        getUserAccessRequest: true,
        getUserAccessFailed: false,
      };
    case USER_ACCESS_SUCCESS:
      return {
        ...state,
        getUserAccessRequest: false,
        getUserAccessFailed: false,
      };
    case USER_ACCESS_FAILED:
      return {
        ...state,
        getUserAccessRequest: false,
        getUserAccessFailed: true,
      };
    case USER_LOGOUT_REQUEST:
      return { ...state, setUserLogoutRequest: true };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        setUserLogoutRequest: false,
        userInfoLoaded: false,
        getUserAccessFailed: true,
      };
    default:
      return state;
  }
};
