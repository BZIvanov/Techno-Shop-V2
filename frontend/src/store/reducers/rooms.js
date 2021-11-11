import { actionType } from '../action-types';

const initialState = {
  rooms: [],
};

export const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_ROOMS:
      return { ...state, rooms: action.payload };
    default:
      return state;
  }
};
