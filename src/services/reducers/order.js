import { ORDER_ACCESS_FAILED, ORDER_ACCESS_SUCCESS } from '../../utils/constants';
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILED,
  SET_TOTALPRICE,
  CLOSE_ORDER_DETAILS,
} from '../actions/order';

const initialState = {
  orderStatus: null,
  orderRequest: false,
  orderFailed: false,
  totalPrice: 0,
  showModal: false,
  access: true,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOTALPRICE:
      return { ...state, totalPrice: action.total };
    case ORDER_REQUEST:
      return { ...state, orderRequest: true, orderFailed: false };
    case ORDER_SUCCESS:
      return { ...state, orderRequest: false, orderStatus: action.orderDetails, showModal: true };
    case ORDER_FAILED:
      return { ...state, orderRequest: false, orderFailed: true };
    case CLOSE_ORDER_DETAILS:
      return { ...state, showModal: false };
    case ORDER_ACCESS_SUCCESS:
      return { ...state, access: true };
    case ORDER_ACCESS_FAILED:
      return { ...state, access: false, orderRequest: false };
    default:
      return state;
  }
};
