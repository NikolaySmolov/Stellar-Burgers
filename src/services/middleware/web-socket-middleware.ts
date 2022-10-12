import { Middleware } from 'redux';
import {
  TWebSocketActions,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ERROR,
  WS_GET_MESSAGE,
} from '../actions/web-socket';
import { AppDispatch, RootState } from '../types';

interface IWsActions {
  wsConnect: typeof WS_CONNECTION_START;
  wsClose: typeof WS_CONNECTION_CLOSE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_GET_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
}

export const wsMiddleware = (wsActionTypes: IWsActions): Middleware<{}, RootState, AppDispatch> => {
  const { wsConnect, wsClose, onOpen, onMessage, onClose, onError } = wsActionTypes;
  let webSocket: null | WebSocket = null;
  let url: string = '';

  function isWsAction(action: any): action is TWebSocketActions {
    return Object.values(wsActionTypes).some(wsActionType => wsActionType === action?.type);
  }

  return store => next => action => {
    if (isWsAction(action)) {
      const { dispatch } = store;

      if (action.type === wsConnect) {
        url = action.payload;
        webSocket = new WebSocket(url);
      }

      if (action.type === wsClose) {
        if (webSocket) {
          webSocket.close(1000, 'CLOSE_NORMAL');
          webSocket = null;
        }
      }

      if (webSocket) {
        webSocket.onopen = () => {
          dispatch({ type: onOpen });
        };

        webSocket.onerror = event => {
          dispatch({ type: onError, payload: 'websocket connection error' });
        };

        webSocket.onclose = event => {
          if (event.wasClean) {
            dispatch({ type: onClose });
          } else {
            setTimeout(() => {
              dispatch({ type: wsConnect, payload: url });
            }, 5000);
          }
        };

        webSocket.onmessage = event => {
          const { success, ...data } = JSON.parse(event.data);
          if (success) {
            dispatch({ type: onMessage, payload: data });
          } else {
            dispatch({ type: onError, payload: data.message });
          }
        };
      }
    }
    return next(action);
  };
};
