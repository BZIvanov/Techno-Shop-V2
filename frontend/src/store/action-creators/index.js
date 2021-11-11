import { actionType } from '../action-types';

export const allRoomsType = (rooms) => ({
  type: actionType.GET_ALL_ROOMS,
  payload: rooms,
});
