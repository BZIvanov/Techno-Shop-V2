import axios from 'axios';

export const registerUser = async (user) => {
  const response = await axios.post(
    'http://localhost:3100/api/v1/auth/register',
    {
      username: user[0],
      email: user[1],
      password: user[2],
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};
