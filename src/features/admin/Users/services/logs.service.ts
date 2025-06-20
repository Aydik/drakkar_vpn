import { axiosInstance } from 'shared/api/axiosInstance.ts';
import type { SystemLogDto } from 'features/admin/Logs/model';

export const getLogs = async (data: SystemLogDto) => {
  try {
    const res = await axiosInstance.get('admin/logs/system', { params: data });
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
