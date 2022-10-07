import { v4 as uuid } from 'uuid';
import { TConstructorIngredient, IIngredient, BUN, SAUCE, MAIN } from '../../utils/constants';

export const CONSTRUCTOR_ADD: 'CONSTRUCTOR_ADD' = 'CONSTRUCTOR_ADD';
export const CONSTRUCTOR_SORT: 'CONSTRUCTOR_SORT' = 'CONSTRUCTOR_SORT';
export const CONSTRUCTOR_DELETE: 'CONSTRUCTOR_DELETE' = 'CONSTRUCTOR_DELETE';
export const CONSTRUCTOR_RESET: 'CONSTRUCTOR_RESET' = 'CONSTRUCTOR_RESET';

interface IGetConstructorAddAction {
  readonly type: typeof CONSTRUCTOR_ADD;
  payload:
    | TConstructorIngredient<typeof BUN>
    | TConstructorIngredient<typeof SAUCE>
    | TConstructorIngredient<typeof MAIN>;
}

interface IGetConstructorSortAction {
  readonly type: typeof CONSTRUCTOR_SORT;
  payload: {
    dragItemPos: number;
    dropTargetPos: number;
  };
}

interface IGetConstructorDeleteAction {
  readonly type: typeof CONSTRUCTOR_DELETE;
  payload: number;
}

interface IGetConstructorResetAction {
  readonly type: typeof CONSTRUCTOR_RESET;
}

export type TConstructorActions =
  | IGetConstructorAddAction
  | IGetConstructorSortAction
  | IGetConstructorDeleteAction
  | IGetConstructorResetAction;

export const getConstructorAddAction = (ingredient: IIngredient): IGetConstructorAddAction => {
  const uniqIngredient = { ...ingredient, tempId: uuid() };

  return { type: CONSTRUCTOR_ADD, payload: uniqIngredient };
};

export const getConstructorSortAction = (
  dragItemPos: number,
  dropTargetPos: number
): IGetConstructorSortAction => ({
  type: CONSTRUCTOR_SORT,
  payload: {
    dragItemPos,
    dropTargetPos,
  },
});

export const getConstructorDeleteAction = (itemPos: number): IGetConstructorDeleteAction => ({
  type: CONSTRUCTOR_DELETE,
  payload: itemPos,
});

export const getConstructorResetAction = (): IGetConstructorResetAction => ({
  type: CONSTRUCTOR_RESET,
});
