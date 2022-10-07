export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_CLEAR_STORE: 'WS_CLEAR_STORE' = 'WS_CLEAR_STORE';

interface IGetWSocketConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  payload: string;
}

interface IGetWSocketConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IGetWSocketConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE;
}

interface IGetWSocketConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IGetWSocketConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: string; //реальный тип будет после типизации middleware
}

interface IGetWSocketGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  payload: ReadonlyArray<string>;
}

interface IGetWSocketClearStoreAction {
  readonly type: typeof WS_CLEAR_STORE;
}

export type TWebSocketActions =
  | IGetWSocketConnectionStartAction
  | IGetWSocketConnectionSuccessAction
  | IGetWSocketConnectionCloseAction
  | IGetWSocketConnectionClosedAction
  | IGetWSocketConnectionErrorAction
  | IGetWSocketGetMessageAction
  | IGetWSocketClearStoreAction;

export const getWSocketConnectionStartAction = (
  payload: string
): IGetWSocketConnectionStartAction => ({
  type: WS_CONNECTION_START,
  payload,
});

export const getWSocketConnectionSuccessAction = (): IGetWSocketConnectionSuccessAction => ({
  type: WS_CONNECTION_SUCCESS,
});

export const getWSocketConnectionCloseAction = (): IGetWSocketConnectionCloseAction => ({
  type: WS_CONNECTION_CLOSE,
});

export const getWSocketConnectionClosedAction = (): IGetWSocketConnectionClosedAction => ({
  type: WS_CONNECTION_CLOSED,
});

export const getWSocketConnectionErrorAction = (
  payload: string
): IGetWSocketConnectionErrorAction => ({
  type: WS_CONNECTION_ERROR,
  payload,
});

export const getWSocketGetMessageAction = (
  payload: ReadonlyArray<string>
): IGetWSocketGetMessageAction => ({
  type: WS_GET_MESSAGE,
  payload,
});

export const getWSocketClearStoreAction = (): IGetWSocketClearStoreAction => ({
  type: WS_CLEAR_STORE,
});
