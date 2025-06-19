import { axiosInstance } from 'shared/api/axiosInstance.ts';

export const getUser = async () => {
  try {
    const res = await axiosInstance.get('user/me');
    console.log(res);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
