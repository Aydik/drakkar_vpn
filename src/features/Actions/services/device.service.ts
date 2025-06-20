import { axiosInstance } from 'shared/api/axiosInstance.ts';
import type { Pagination } from 'shared/model';

export const getActions = async (pagination: Pagination) => {
  try {
    const res = await axiosInstance.get('user/user/my-actions', { params: pagination });
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
