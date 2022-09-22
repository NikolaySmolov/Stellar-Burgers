import { BUN } from '../../utils/constants';

export const getBun = store =>
  store.burgerConstructor.bun.length > 0 ? store.burgerConstructor.bun : null;

export const getFillings = store =>
  store.burgerConstructor.filling.length > 0 ? store.burgerConstructor.filling : null;

//нужен реселект, т.к. дублируется код в селекторах

export const getOrderingPermission = store => {
  const bun = store.burgerConstructor.bun;
  const filling = store.burgerConstructor.filling;

  return bun.length > 0 && filling.length > 0 ? true : false;
};

export const getBurgerIngredientsIdList = store => {
  const ingredientsList = Object.values(store.burgerConstructor).flat();

  if (ingredientsList.length > 0) {
    const ingredientsIdList = ingredientsList.map(({ _id }) => _id);
    return ingredientsIdList;
  } else {
    return [];
  }
};

export const getTotalPrice = store => {
  const ingredientsList = Object.values(store.burgerConstructor).flat();

  if (ingredientsList.length > 0) {
    return ingredientsList.reduce((acc, item) => {
      return item.type === BUN ? (acc += item.price * 2) : (acc += item.price);
    }, 0);
  }

  return 0;
};

export const getCounter = store => {
  const counter = {};
  const bun = store.burgerConstructor.bun;
  const filling = store.burgerConstructor.filling;

  if (bun.length > 0) {
    counter[bun[0]._id] = 2;
  }

  if (filling.length > 0) {
    filling.forEach(item => {
      if (counter[item._id]) {
        counter[item._id]++;
      } else {
        counter[item._id] = 1;
      }
    });
  }

  return counter;
};
