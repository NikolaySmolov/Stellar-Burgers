import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, AppThunk } from './types';

export const useAppDispatch: () => AppDispatch | AppThunk = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
