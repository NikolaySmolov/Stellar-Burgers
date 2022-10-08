import { IOrderInFeed } from '../../utils/types';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CLEAR_STORE,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  TWebSocketActions,
  WS_CONNECTION_START,
} from '../actions/web-socket';

interface IWebSocketState {
  connected: boolean;
  connecting: boolean;
  orders: ReadonlyArray<IOrderInFeed>;
  total: null | number;
  totalToday: null | number;
  error: string;
}

const initState: IWebSocketState = {
  connected: false,
  connecting: false,
  orders: [],
  total: null,
  totalToday: null,
  error: null,
};

export const wsReducer = (state = initState, action: TWebSocketActions): IWebSocketState => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return { ...state, connecting: true };
    case WS_CONNECTION_SUCCESS:
      return { ...state, connecting: false, connected: true, error: null };
    case WS_CONNECTION_ERROR:
      return { ...state, connected: false, error: action.payload };
    case WS_CONNECTION_CLOSED:
      return { ...state, connected: false };
    case WS_GET_MESSAGE:
      return { ...state, ...action.payload };
    case WS_CLEAR_STORE:
      return { ...initState };
    default:
      return state;
  }
};
