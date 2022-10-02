import { IOrderInFeed } from '../../utils/constants';
import { RootState } from '../types';

export const selectFeedOrders = (store: RootState): ReadonlyArray<IOrderInFeed> =>
  store.feed.orders;

export const selectFeedTotalCount = (store: RootState): number => store.feed.total;

export const selectFeedTodayCount = (store: RootState): number => store.feed.totalToday;

export const selectFeedError = (store: RootState): unknown => store.feed.error;
