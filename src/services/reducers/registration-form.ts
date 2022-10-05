import {
  REGISTER_FORM_FAILED,
  REGISTER_FORM_REQUEST,
  REGISTER_FORM_RESET_VALUES,
  REGISTER_FORM_SET_VALUE,
  REGISTER_FORM_SUCCESS,
  TRegistrationActions,
} from '../actions/registration-form';

interface TRegistrationFormState {
  name: string;
  email: string;
  password: string;
  registrationRequest: boolean;
  registrationFailed: boolean;
  error: null | string;
}

const initState: TRegistrationFormState = {
  name: '',
  email: '',
  password: '',
  registrationRequest: false,
  registrationFailed: false,
  error: null,
};

export const registrationFormReducer = (
  state = initState,
  action: TRegistrationActions
): TRegistrationFormState => {
  switch (action.type) {
    case REGISTER_FORM_SET_VALUE:
      return { ...state, ...action.payload, error: null };
    case REGISTER_FORM_REQUEST:
      return { ...state, registrationRequest: true };
    case REGISTER_FORM_SUCCESS:
      return { ...state, registrationRequest: false, registrationFailed: false };
    case REGISTER_FORM_FAILED:
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: true,
        error: action.payload,
      };
    case REGISTER_FORM_RESET_VALUES:
      return { ...initState };
    default:
      return state;
  }
};
