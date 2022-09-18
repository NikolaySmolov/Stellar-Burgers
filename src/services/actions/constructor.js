import { v4 as uuid } from 'uuid';

const index = 'CONSTRUCTOR';

export const ACTION_TYPES = {
  ADD: `${index}/ADD`,
  SORT: `${index}/SORT`,
  DELETE: `${index}/DELETE`,
  RESET: `${index}/RESET`,
};

export const addIngredient = ingredient => {
  const uniqIngredient = { ...ingredient, tempId: uuid() };

  return { type: ACTION_TYPES.ADD, payload: uniqIngredient };
};

export const sortIngredient = (dragItemPos, dropTargetPos) => ({
  type: ACTION_TYPES.SORT,
  payload: {
    dragItemPos,
    dropTargetPos,
  },
});

export const deleteIngredient = (itemId, itemPos) => ({
  type: ACTION_TYPES.DELETE,
  payload: {
    itemId,
    itemPos,
  },
});

export const resetConstructor = () => ({
  type: ACTION_TYPES.RESET,
});
