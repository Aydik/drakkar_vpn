import { axiosInstance } from 'shared/api/axiosInstance.ts';

export const getTariffs = async () => {
  try {
    const res = await axiosInstance.get('user/tariff');
    return res.data;
  } catch (err) {
    throw err;
  }
};
