import { AUTH_FORM_SET_VALUE } from '../../utils/constants';

const initialState = {
  name: '',
  email: '',
  password: '',
  accessToken: '',
  submitRequest: false,
  submitFailed: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_FORM_SET_VALUE:
      return { ...state, ...action.payload };
  }
};
