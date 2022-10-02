import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CLEAR_STORE,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
} from '../actions/web-socket';

const initialState = {
  connected: false,
  orders: [],
  total: null,
  totalToday: null,
  error: null,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return { ...state, connected: true, error: null };
    case WS_CONNECTION_ERROR:
      return { ...state, connected: false, error: action.payload };
    case WS_CONNECTION_CLOSED:
      return { ...state, connected: false, error: null };
    case WS_GET_MESSAGE:
      return { ...state, ...action.payload };
    case WS_CLEAR_STORE:
      return { ...initialState };
    default:
      return state;
  }
};
