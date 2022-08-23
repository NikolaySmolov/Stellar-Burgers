import {
  PROFILE_USER_INFO_FAILED,
  PROFILE_USER_INFO_FORM_FAILED,
  PROFILE_USER_INFO_FORM_RESET,
  PROFILE_USER_INFO_FORM_SUBMIT,
  PROFILE_USER_INFO_FORM_SUCCESS,
  PROFILE_USER_INFO_FORM_VALUE,
  PROFILE_USER_INFO_REQUEST,
  PROFILE_USER_INFO_SUCCESS,
  USER_ACCESS_FAILED,
  USER_ACCESS_REQUEST,
  USER_ACCESS_SUCCESS,
} from '../../utils/constants';

const initialState = {
  userInfo: {
    name: '',
    email: '',
    getUserInfoRequest: false,
    getUserInfoFailed: false,
  },
  userInfoForm: {
    name: '',
    email: '',
    password: '',
    setUserInfoRequest: false,
    setUserInfoFailed: false,
  },
  getUserAccessRequest: false,
  getUserAccessFailed: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_USER_INFO_REQUEST:
      return { ...state, userInfo: { ...state.userInfo, getUserInfoRequest: true } };
    case PROFILE_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: { ...state.userInfo, getUserInfoRequest: false, ...action.payload },
        userInfoForm: { ...state.userInfoForm, ...action.payload },
      };
    case PROFILE_USER_INFO_FAILED:
      return {
        ...state,
        userInfo: { ...initialState.userInfo, getUserInfoRequest: false, getUserInfoFailed: true },
      };
    case PROFILE_USER_INFO_FORM_VALUE:
      return { ...state, userInfoForm: { ...state.userInfoForm, ...action.payload } };
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
      return { ...state, userInfoForm: { ...state.userInfoForm, setUserInfoRequest: true } };
    case PROFILE_USER_INFO_FORM_SUCCESS:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
        userInfoForm: { ...state.userInfoForm, setUserInfoRequest: false },
      };
    case PROFILE_USER_INFO_FORM_FAILED:
      return {
        ...state,
        userInfoForm: { ...state.userInfoForm, setUserInfoRequest: false, setUserInfoFailed: true },
      };
    case USER_ACCESS_REQUEST:
      return { ...state, getUserAccessRequest: true };
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
    default:
      return state;
  }
};
