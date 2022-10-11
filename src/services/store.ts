import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { wsMiddleware } from './middleware/web-socket-middleware';
import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ERROR,
  WS_GET_MESSAGE,
} from './actions/web-socket';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const WS_ACTIONS = {
  wsConnect: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_GET_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, wsMiddleware(WS_ACTIONS)));

export const store = createStore(rootReducer, enhancer);
