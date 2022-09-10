export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_CLEAR_STORE = 'WS_CLEAR_STORE';
export const WS_CONNECTION_CLOSE = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';

export const setSocketConnection = (payload) => ({
  type: WS_CONNECTION_START,
  payload,
});

export const setSocketDisconnect = () => ({
  type: WS_CONNECTION_CLOSE,
});
