import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { WS, WS_ACTIONS } from '../utils/constants';
import { wsMiddleware } from './middleware/web-socket-middleware';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, wsMiddleware(WS, WS_ACTIONS)));

export const store = createStore(rootReducer, enhancer);
