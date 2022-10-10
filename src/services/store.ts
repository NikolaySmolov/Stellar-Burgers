import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { wsMiddleware } from './middleware/web-socket-middleware';
import {
  getWSocketConnectionCloseAction,
  getWSocketConnectionClosedAction,
  getWSocketConnectionErrorAction,
  getWSocketConnectionStartAction,
  getWSocketConnectionSuccessAction,
  getWSocketGetMessageAction,
} from './actions/web-socket';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const WS_ACTIONS = {
  wsConnect: getWSocketConnectionStartAction,
  wsDisconnect: getWSocketConnectionCloseAction,
  onOpen: getWSocketConnectionSuccessAction,
  onMessage: getWSocketGetMessageAction,
  onClose: getWSocketConnectionClosedAction,
  onError: getWSocketConnectionErrorAction,
};

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, wsMiddleware(WS_ACTIONS)));

export const store = createStore(rootReducer, enhancer);
