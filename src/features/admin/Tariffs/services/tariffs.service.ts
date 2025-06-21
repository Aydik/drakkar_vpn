import { axiosInstance } from 'shared/api/axiosInstance.ts';
import type { TariffWithoutId } from 'entities/Tarrif/model';

export const createTariff = async (tariff: TariffWithoutId) => {
  try {
    const res = await axiosInstance.post('admin/tariffs', tariff);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateTariff = async (tariff: TariffWithoutId, id: string) => {
  try {
    const res = await axiosInstance.put(`admin/tariffs/${id}`, tariff);
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
