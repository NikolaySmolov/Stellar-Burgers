import { Middleware } from 'redux';
import {
  getWSocketConnectionClosedAction,
  getWSocketConnectionErrorAction,
  getWSocketConnectionStartAction,
  getWSocketConnectionSuccessAction,
  getWSocketGetMessageAction,
  TWebSocketActions,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from '../actions/web-socket';
import { AppDispatch, RootState } from '../types';

interface IWsActions {
  wsConnect: typeof getWSocketConnectionStartAction;
  onOpen: typeof getWSocketConnectionSuccessAction;
  onMessage: typeof getWSocketGetMessageAction;
  onClose: typeof getWSocketConnectionClosedAction;
  onError: typeof getWSocketConnectionErrorAction;
}

//typeGuard
function isWsAction(action: any): action is TWebSocketActions {
  const wsActionTypes = [
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
  ];

  return wsActionTypes.some(type => type === action?.type);
}

export const wsMiddleware = (wsActions: IWsActions): Middleware<{}, RootState, AppDispatch> => {
  let webSocket: null | WebSocket = null;
  let url: string = '';

  return store => next => action => {
    if (isWsAction(action)) {
      const { dispatch } = store;

      const { wsConnect, onOpen, onMessage, onClose, onError } = wsActions;

      if (action.type === WS_CONNECTION_START) {
        url = action.payload;
        webSocket = new WebSocket(url);
      }

      if (action.type === WS_CONNECTION_CLOSE) {
        if (webSocket) {
          webSocket.close(1000, 'CLOSE_NORMAL');
          webSocket = null;
        }
      }

      if (webSocket) {
        webSocket.onopen = () => {
          dispatch(onOpen());
        };

        webSocket.onerror = event => {
          dispatch(onError('websocket connection error'));
        };

        webSocket.onclose = event => {
          if (event.wasClean) {
            dispatch(onClose());
          } else {
            setTimeout(() => {
              dispatch(wsConnect(url));
            }, 5000);
          }
        };

        webSocket.onmessage = event => {
          const { success, ...data } = JSON.parse(event.data);
          if (success) {
            dispatch(onMessage(data));
          } else {
            dispatch(onError(data.message));
          }
        };
      }
    }
    return next(action);
  };
};
