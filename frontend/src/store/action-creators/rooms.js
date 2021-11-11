import { getAllRoomsCall } from '../../api/rooms';
import { apiCallStartType, apiCallSuccessType, apiCallFailType } from './';
import { actionType } from '../action-types';

export const allRoomsType = (rooms) => ({
  type: actionType.GET_ALL_ROOMS,
  payload: rooms,
});

export const getAllRoomsAction = () => {
  return async (dispatch) => {
    dispatch(apiCallStartType());

    try {
      const { data } = await getAllRoomsCall();

      dispatch(apiCallSuccessType());
      dispatch(allRoomsType(data));
    } catch (error) {
      dispatch(apiCallFailType('Get all rooms error'));
    }
  };
};
