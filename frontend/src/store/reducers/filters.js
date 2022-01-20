import { actionType } from '../action-types';

const initialState = { text: '', price: [0, 4999] };

export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_SEARCH_FILTERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
