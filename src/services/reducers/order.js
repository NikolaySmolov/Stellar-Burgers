import { ACTION_TYPES } from '../actions/order';

const initialState = {
  orderStatus: null,
  orderRequest: false,
  orderFailed: false,
  orderingPermission: true,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.REQUEST:
      return { ...state, orderRequest: true, orderFailed: false };
    case ACTION_TYPES.SUCCESS:
      return { ...state, orderRequest: false, orderStatus: action.payload };
    case ACTION_TYPES.FAILED:
      return { ...state, orderRequest: false, orderFailed: true };
    case ACTION_TYPES.CLOSE_DETAILS:
      return { ...state, orderStatus: null };
    case ACTION_TYPES.PERMISSION_SUCCESS:
      return { ...state, orderingPermission: true };
    case ACTION_TYPES.PERMISSION_FAILED:
      return { ...state, orderingPermission: false, orderRequest: false };
    default:
      return state;
  }
};
