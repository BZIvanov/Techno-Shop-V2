import { actionType } from '../action-types';

export const filterAction = (filters) => ({
  type: actionType.SET_SEARCH_FILTERS,
  payload: filters,
});
