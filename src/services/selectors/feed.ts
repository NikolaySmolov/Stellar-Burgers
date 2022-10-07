import { RootState } from '../types';

export const selectFeedOrders = (store: RootState) => store.feed.orders;

export const selectFeedTotalCount = (store: RootState) => store.feed.total;

export const selectFeedTodayCount = (store: RootState) => store.feed.totalToday;

export const selectFeedError = (store: RootState) => store.feed.error;
