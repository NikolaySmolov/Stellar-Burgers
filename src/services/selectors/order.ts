import { RootState } from '../types';

export const selectOrderingPermission = (store: RootState) => store.order.orderingPermission;

export const selectOrderRequest = (store: RootState) => store.order.orderRequest;

export const selectOrderFailed = (store: RootState) => store.order.orderFailed;

export const selectOrderStatus = (store: RootState) => store.order.orderStatus;
