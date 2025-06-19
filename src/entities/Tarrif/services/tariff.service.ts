import { axiosInstance } from 'shared/api/axiosInstance.ts';

export const getTariffs = async () => {
  try {
    const res = await axiosInstance.get('user/tariff');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const purchaseTariff = async (tariffId: string, enableAutoRenew: boolean = true) => {
  try {
    const res = await axiosInstance.post('user/subscription/purchase', {
      tariffId,
      enableAutoRenew,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getSubscription = async () => {
  try {
    const res = await axiosInstance.get('user/subscription/my');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const setAutorenew = async (enable: boolean) => {
  try {
    const res = await axiosInstance.put('user/subscription/autorenew', { enable });
    return res.data;
  } catch (err) {
    throw err;
  }
};
