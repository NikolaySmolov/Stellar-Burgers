import { TOrderActions } from '../actions/order';

interface IOrderState {
  request: boolean;
  details: null | number;
  failed: boolean;
  error: null | string;
}

const initState: IOrderState = {
  request: false,
  details: null,
  failed: false,
  error: null,
};

export const orderReducer = (state = initState, action: TOrderActions): IOrderState => {
  switch (action.type) {
    case 'ORDER_REQUEST':
      return { ...state, request: true };
    case 'ORDER_SUCCESS':
      return { ...state, request: false, failed: false, error: null, details: action.payload };
    case 'ORDER_FAILED':
      return { ...state, request: false, failed: true, error: action.payload };
    case 'ORDER_CLOSE_DETAILS':
      return { ...state, details: null };
    default:
      return state;
  }
};
