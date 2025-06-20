import { axiosInstance } from 'shared/api/axiosInstance.ts';

export const getActions = async () => {
  try {
    const res = await axiosInstance.get('user/user/my-actions');
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
