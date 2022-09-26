export const selectIngredients = store => {
  return store.ingredients.ingredients;
};

export const selectIngredientsRequest = store => store.ingredients.request;

export const selectIngredientsFailed = store => store.ingredients.failed;
