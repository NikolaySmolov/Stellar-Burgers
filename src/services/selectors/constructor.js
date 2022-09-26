import { createSelector } from 'reselect';
import { BUN } from '../../utils/constants';

export const selectBun = store =>
  store.burgerConstructor.bun.length > 0 ? store.burgerConstructor.bun : null;

export const selectFillings = store =>
  store.burgerConstructor.filling.length > 0 ? store.burgerConstructor.filling : null;

export const selectBurgerCompleteState = createSelector(
  [selectBun, selectFillings],
  (bun, fillings) => {
    return bun && fillings ? true : false;
  }
);

const selectConstructorIngredients = createSelector(
  [selectBun, selectFillings],
  (bun, fillings) => {
    const constructorIngredients = [];

    if (bun) {
      constructorIngredients.push(...bun);
    } else if (fillings) {
      constructorIngredients.push(...fillings);
    }

    return constructorIngredients;
  }
);

export const selectConstructorIngredientsIdList = createSelector(
  [selectConstructorIngredients],
  ingredientsList => {
    if (ingredientsList.length > 0) {
      const ingredientsIdList = ingredientsList.map(({ _id }) => _id);
      return ingredientsIdList;
    } else {
      return [];
    }
  }
);

export const selectTotalPrice = createSelector([selectConstructorIngredients], ingredientsList => {
  if (ingredientsList.length > 0) {
    return ingredientsList.reduce((acc, item) => {
      return item.type === BUN ? (acc += item.price * 2) : (acc += item.price);
    }, 0);
  }

  return 0;
});

export const selectCounter = createSelector([selectBun, selectFillings], (bun, fillings) => {
  const counter = {};

  if (bun) {
    counter[bun[0]._id] = 2;
  }

  if (fillings) {
    fillings.forEach(item => {
      if (counter[item._id]) {
        counter[item._id]++;
      } else {
        counter[item._id] = 1;
      }
    });
  }

  return counter;
});
