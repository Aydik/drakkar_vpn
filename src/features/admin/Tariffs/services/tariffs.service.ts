import { axiosInstance } from 'shared/api/axiosInstance.ts';
import type { Tariff } from 'entities/Tarrif/model';

export const createTariff = async (tariff: Tariff) => {
  try {
    const res = await axiosInstance.post('admin/tariffs', tariff);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateTariff = async (tariff: Tariff) => {
  try {
    const { id, ...dataWithoutId } = tariff;
    const res = await axiosInstance.put(`admin/tariffs/${id}`, dataWithoutId);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteTariff = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`admin/tariffs/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
