import axios from './axios';

export const getAllRoomsCall = () => {
  return axios.get('/rooms');
};
