import { axiosInstance } from 'shared/api/axiosInstance.ts';
import Cookies from 'js-cookie';
import { CreateUserDto, LoginUserDto } from 'app/models/generated';

export const registerUser = async (data: CreateUserDto) => {
  try {
    const res = await axiosInstance.post('auth/register', data);
    await setCookie(res.data.accessToken, res.data.refreshToken, res.data.id);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const authUser = async (data: LoginUserDto) => {
  try {
    const res = await axiosInstance.post('auth/login', data);
    await setCookie(res.data.accessToken, res.data.refreshToken, res.data.id);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const setCookie = async (accessToken: string, refreshToken: string, userId: string) => {
  Cookies.set('accessToken', accessToken, {
    expires: 30,
    secure: true,
    sameSite: 'Strict',
  });
  Cookies.set('refreshToken', refreshToken, {
    expires: 30,
    secure: true,
    sameSite: 'Strict',
  });
  Cookies.set('userId', userId, {
    expires: 30,
    secure: true,
    sameSite: 'Strict',
  });
};

export const logout = async () => {
  try {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('userId');
  } catch (err) {
    throw err;
  }
};
