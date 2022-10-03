export const wsMiddleware = (wsUrl, wsActions) => {
  let webSocket = null;
  return store => next => action => {
    const { dispatch } = store;
    const { type, payload } = action;

    const { wsInit, wsClose, wsClearStore, onOpen, onMessage, onClose, onError } = wsActions;

    if (type === wsInit) {
      webSocket = new WebSocket(`${wsUrl}${payload}`);
    }

    if (type === wsClose) {
      dispatch({ type: wsClearStore });
      webSocket.close(1000, 'CLOSE_NORMAL');
      webSocket = null;
    }

    if (webSocket) {
      webSocket.onopen = () => {
        dispatch({ type: onOpen });
      };

      webSocket.onerror = event => {
        dispatch({ type: onError, payload: event });
      };

      webSocket.onclose = () => {
        dispatch({ type: onClose });
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
    return next(action);
  };
};
