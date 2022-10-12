export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ERROR: 'WS_GET_ERROR' = 'WS_GET_ERROR';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';

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

interface IGetWSocketGetErrorAction {
  readonly type: typeof WS_GET_ERROR;
  payload: string;
}

interface IGetWSocketGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  payload: ReadonlyArray<string>;
}

export type TWebSocketActions =
  | IGetWSocketConnectionStartAction
  | IGetWSocketConnectionSuccessAction
  | IGetWSocketConnectionCloseAction
  | IGetWSocketConnectionClosedAction
  | IGetWSocketGetErrorAction
  | IGetWSocketGetMessageAction;

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

export const getWSocketGetErrorAction = (payload: string): IGetWSocketGetErrorAction => ({
  type: WS_GET_ERROR,
  payload,
});

export const getWSocketGetMessageAction = (
  payload: ReadonlyArray<string>
): IGetWSocketGetMessageAction => ({
  type: WS_GET_MESSAGE,
  payload,
});
