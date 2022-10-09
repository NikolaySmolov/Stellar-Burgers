import { Middleware } from 'redux';
import {
  getWSocketConnectionCloseAction,
  getWSocketConnectionClosedAction,
  getWSocketConnectionErrorAction,
  getWSocketConnectionStartAction,
  getWSocketConnectionSuccessAction,
  getWSocketGetMessageAction,
} from '../actions/web-socket';
import { AppDispatch, RootState } from '../types';

interface IWsActions {
  wsConnect: typeof getWSocketConnectionStartAction;
  wsDisconnect: typeof getWSocketConnectionCloseAction;
  onOpen: typeof getWSocketConnectionSuccessAction;
  onMessage: typeof getWSocketGetMessageAction;
  onClose: typeof getWSocketConnectionClosedAction;
  onError: typeof getWSocketConnectionErrorAction;
}

export const wsMiddleware = (wsActions: IWsActions): Middleware<{}, RootState, AppDispatch> => {
  let webSocket: null | WebSocket = null;
  let url: string = '';

  return store => next => action => {
    const { dispatch } = store;
    const { type, payload } = action;

    const { wsConnect, wsDisconnect, onOpen, onMessage, onClose, onError } = wsActions;

    if (wsConnect.toString().match(type)) {
      url = payload;
      webSocket = new WebSocket(url);
    }

    if (wsDisconnect.toString().match(type)) {
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
    return next(action);
  };
};
