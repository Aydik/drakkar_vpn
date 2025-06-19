import { axiosInstance } from 'shared/api/axiosInstance.ts';
import type { CreateDeviceDto } from 'features/Devices/model';

export const getDevices = async () => {
  try {
    const res = await axiosInstance.get('user/devices');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createDevice = async (deviceDto: CreateDeviceDto) => {
  try {
    const res = await axiosInstance.post('user/devices', deviceDto);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteDevice = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`user/devices/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
