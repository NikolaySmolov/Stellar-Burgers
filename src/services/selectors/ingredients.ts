import { RootState } from '../types';

export const selectIngredientsState = (store: RootState) => store.ingredients;

export const selectIngreditntsList = (store: RootState) => store.ingredients.ingredients;
