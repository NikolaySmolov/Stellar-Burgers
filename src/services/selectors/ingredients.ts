import { IIngredient } from "../../utils/constants";
import { RootState } from "../types";

export const selectIngredients = (store: RootState): ReadonlyArray<IIngredient> => {
  return store.ingredients.ingredients;
};

export const selectIngredientsRequest = (store: RootState): boolean => store.ingredients.request;

export const selectIngredientsFailed = (store: RootState): boolean => store.ingredients.failed;
