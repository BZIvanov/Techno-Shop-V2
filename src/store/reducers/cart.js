import { TOGGLE_CART_DROPDOWN } from '../actions/types';

const INITIAL_STATE = {
  hidden: true,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_CART_DROPDOWN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    default:
      return state;
  }
};

export default reducer;
