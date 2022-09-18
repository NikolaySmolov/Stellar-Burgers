import { BUN } from '../../utils/constants';
import { ACTION_TYPES } from '../actions/constructor';

const initialState = {
  bun: [],
  filling: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD:
      if (action.payload.type === BUN) {
        return { ...state, bun: [action.payload] };
      }

      const filling = [...state.filling];
      filling.push(action.payload);
      return { ...state, filling };
    case ACTION_TYPES.RESET:
      return { ...initialState };
    default:
      return state;
  }
};
