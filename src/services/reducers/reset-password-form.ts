import {
  RESET_PASS_FORM_REQUEST,
  RESET_PASS_FORM_GET_CODE_SUCCESS,
  RESET_PASS_FORM_SET_PASS_SUCCESS,
  RESET_PASS_FORM_FAILED,
  RESET_PASS_FORM_SET_VALUE,
  RESET_PASS_FORM_RESET_VALUES,
  TResetPassFormActions,
  RESET_PASS_FORM_RESET_STATE,
} from '../actions/reset-password-form';

interface IResetPassState {
  email: string;
  password: string;
  token: string;
  request: boolean;
  codeSuccess: boolean;
  savedPass: boolean;
  failed: boolean;
  error: null | string;
}

const initState: IResetPassState = {
  email: '',
  password: '',
  token: '',
  request: false,
  codeSuccess: false,
  savedPass: false,
  failed: false,
  error: null,
};

export const resetPasswordFormReducer = (
  state = initState,
  action: TResetPassFormActions
): IResetPassState => {
  switch (action.type) {
    case RESET_PASS_FORM_REQUEST:
      return { ...state, request: true };
    case RESET_PASS_FORM_GET_CODE_SUCCESS:
      return { ...state, request: false, failed: false, codeSuccess: true };
    case RESET_PASS_FORM_SET_PASS_SUCCESS:
      return { ...state, request: false, failed: false, savedPass: true };
    case RESET_PASS_FORM_FAILED:
      return { ...state, request: false, failed: true, error: action.payload };
    case RESET_PASS_FORM_SET_VALUE:
      return { ...state, failed: false, error: null, ...action.payload };
    case RESET_PASS_FORM_RESET_VALUES:
      return { ...state, email: '', password: '', token: '' };
    case RESET_PASS_FORM_RESET_STATE:
      return { ...initState };
    default:
      return state;
  }
};
