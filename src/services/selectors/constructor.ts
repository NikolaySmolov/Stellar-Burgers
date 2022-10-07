import { createSelector } from 'reselect';
import { BUN } from '../../utils/constants';
import { RootState } from '../types';

export const selectBun = (store: RootState) =>
  store.burgerConstructor.bun.length > 0 ? store.burgerConstructor.bun : null;

export const selectFillings = (store: RootState) =>
  store.burgerConstructor.filling.length > 0 ? store.burgerConstructor.filling : null;

export const selectConstructorList = (store: RootState) => {
  return [...store.burgerConstructor.bun, ...store.burgerConstructor.filling];
};

export const selectBurgerCompleteState = createSelector(
  [selectBun, selectFillings],
  (bun, fillings) => {
    return bun && fillings ? true : false;
  }
);

export const selectTotalPrice = createSelector([selectConstructorList], ingredientsList => {
  if (ingredientsList.length > 0) {
    return ingredientsList.reduce(
      (acc, item) => (item.type === BUN ? (acc += item.price * 2) : (acc += item.price)),
      0
    );
  }

  return 0;
});

export const selectCounter = createSelector([selectBun, selectFillings], (bun, fillings) => {
  const counter: {
    [key in string]: number;
  } = {};

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
