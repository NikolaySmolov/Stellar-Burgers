export const getBun = store => store.burgerConstructor.bun;

export const getFilling = store => store.burgerConstructor.filling;

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
