import {
  REGISTER_FORM_FAILED,
  REGISTER_FORM_REQUEST,
  REGISTER_FORM_RESET_VALUES,
  REGISTER_FORM_SET_VALUE,
  REGISTER_FORM_SUCCESS,
  TRegistrationFormActions,
} from '../actions/registration-form';

interface TRegistrationFormState {
  name: string;
  email: string;
  password: string;
  request: boolean;
  failed: boolean;
  error: null | string;
}

const initState: TRegistrationFormState = {
  name: '',
  email: '',
  password: '',
  request: false,
  failed: false,
  error: null,
};

export const registrationFormReducer = (
  state = initState,
  action: TRegistrationFormActions
): TRegistrationFormState => {
  switch (action.type) {
    case REGISTER_FORM_SET_VALUE:
      return { ...state, ...action.payload, error: null };
    case REGISTER_FORM_REQUEST:
      return { ...state, request: true };
    case REGISTER_FORM_SUCCESS:
      return { ...state, request: false, failed: false };
    case REGISTER_FORM_FAILED:
      return {
        ...state,
        request: false,
        failed: true,
        error: action.payload,
      };
    case REGISTER_FORM_RESET_VALUES:
      return { ...initState };
    default:
      //eslint-disable-next-line
      const _exhaustiveCheck: never = action;
      return state;
  }
};
