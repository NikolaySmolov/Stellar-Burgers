import { BUN, MAIN, SAUCE } from '../../utils/constants';
import { TConstructorIngredient } from '../../utils/types';
import {
  CONSTRUCTOR_ADD,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_SORT,
  TConstructorActions,
} from '../actions/constructor';

interface IConstructorState {
  bun: ReadonlyArray<TConstructorIngredient<typeof BUN>>;
  filling: ReadonlyArray<TConstructorIngredient<typeof SAUCE | typeof MAIN>>;
}

const initState: IConstructorState = {
  bun: [],
  filling: [],
};

export const constructorReducer = (
  state = initState,
  action: TConstructorActions
): IConstructorState => {
  switch (action.type) {
    case CONSTRUCTOR_ADD:
      if (action.payload.type === BUN) {
        return { ...state, bun: [action.payload] };
      }
      const filling = [...state.filling];
      filling.push(action.payload);
      return { ...state, filling };
    case CONSTRUCTOR_SORT:
      const sortableItem = state.filling.find((_, index) => index === action.payload.dragItemPos);

      const sortedFillings = [...state.filling].filter(
        (_, index) => index !== action.payload.dragItemPos
      );

      sortedFillings.splice(action.payload.dropTargetPos, 0, sortableItem);

      return { ...state, filling: sortedFillings };

    case CONSTRUCTOR_DELETE:
      const filteredFiling = [...state.filling].filter((_, index) => index !== action.payload);

      return { ...state, filling: filteredFiling };

    case CONSTRUCTOR_RESET:
      return { ...initState };

    default:
      return state;
  }
};
