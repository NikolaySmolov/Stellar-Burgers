import { ACCESS_TOKEN } from '../../utils/constants';
import { getCookie } from '../utils';

export const wsMiddleware = (wsUrl, wsActions) => {
  let webSocket = null;
  return (store) => (next) => (action) => {
    const { dispatch } = store;
    const { type } = action;

    const { wsInit, wsProfileInit, wsClose, onOpen, onMessage, onClose, onError, resetOrders } =
      wsActions;

    if (type === wsInit) {
      webSocket = new WebSocket(`${wsUrl}/all`);
    }

    if (type === wsProfileInit) {
      webSocket = new WebSocket(`${wsUrl}?token=${getCookie(ACCESS_TOKEN)}`);
    }

    if (type === wsClose) {
      dispatch({ type: resetOrders });
      webSocket.close(1000, 'CLOSE_NORMAL');
      webSocket = null;
    }

    if (webSocket) {
      webSocket.onopen = () => {
        dispatch({ type: onOpen });
      };

      webSocket.onerror = (event) => {
        dispatch({ type: onError, payload: event });
      };

      webSocket.onclose = () => {
        dispatch({ type: onClose });
      };

      webSocket.onmessage = (event) => {
        const { success, ...data } = JSON.parse(event.data);
        dispatch({ type: onMessage, payload: data });
      };
    }
    return next(action);
  };
};
