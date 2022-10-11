import { FAKE_PASSWORD } from '../../utils/constants';
import {
  PROFILE_FORM_FAILED,
  PROFILE_FORM_REQUEST,
  PROFILE_FORM_RESET_VALUES,
  PROFILE_FORM_SET_VALUE,
  PROFILE_FORM_SUCCESS,
  TProfileFormActions,
} from '../actions/profile-form';
import { TProfileForm } from '../types/data';

interface IProfileFormState extends Required<TProfileForm> {
  request: boolean;
  failed: boolean;
  error: null | string;
}

const initState: IProfileFormState = {
  name: '',
  email: '',
  password: FAKE_PASSWORD,
  request: true,
  failed: false,
  error: null,
};

export const profileFormReducer = (
  state = initState,
  action: TProfileFormActions
): IProfileFormState => {
  switch (action.type) {
    case PROFILE_FORM_REQUEST:
      return { ...state, request: true };
    case PROFILE_FORM_SUCCESS:
      return { ...state, request: false, failed: false, password: initState.password };
    case PROFILE_FORM_FAILED:
      return { ...state, request: false, failed: true, error: action.payload };
    case PROFILE_FORM_SET_VALUE:
      return { ...state, failed: false, error: null, request: false, ...action.payload };
    case PROFILE_FORM_RESET_VALUES:
      return { ...initState, request: false, ...action.payload };
    default:
      //eslint-disable-next-line
      const _exhaustiveCheck: never = action;
      return state;
  }
};
