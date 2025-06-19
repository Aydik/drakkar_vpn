import { axiosInstance } from 'shared/api/axiosInstance.ts';
import Cookies from 'js-cookie';
import type { LoginUserDto, CreateUserDto } from 'features/Auth/model';

export const registerUser = async (data: CreateUserDto) => {
  try {
    const res = await axiosInstance.post('user/auth/register', data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const authUser = async (data: LoginUserDto) => {
  try {
    const res = await axiosInstance.post('user/auth/login', data);
    await setCookie(res.data.result.token);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const setCookie = async (accessToken: string) => {
  Cookies.set('accessToken', accessToken, {
    expires: 30,
    secure: true,
    sameSite: 'Strict',
  });
};

export const logout = async () => {
  try {
    Cookies.remove('accessToken');
  } catch (err) {
    throw err;
  }
};
