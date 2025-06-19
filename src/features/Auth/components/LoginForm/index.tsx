import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'shared/ui/Button';
import { Typography } from 'shared/ui/Typography';
import styles from 'features/Auth/styles/index.module.scss';
import { InputWithFormatter } from 'shared/ui/InputWithFormatter';
import { AxiosError } from 'axios';
import type { LoginUserDto } from 'features/Auth/model';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'app/store';
import { useNavigate } from 'react-router-dom';
import { authUser } from 'features/Auth/services/auth.service.ts';
import { updateUser } from 'entities/User/slice';
import type { ApiResponse } from 'shared/api/response.ts';

export const LoginForm: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<LoginUserDto>();

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginUserDto) => {
    try {
      await authUser({
        email: data.email,
        password: data.password,
      });
      await dispatch(updateUser());
      navigate('/profile');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const message =
        axiosError?.response?.data?.errorMessages?.[0] || 'Произошла ошибка авторизации';

      setError('password', {
        type: 'manual',
        message,
      });
    }
  };

  return (
    <>
      <Typography variant={'h4'} className={styles.title}>
        Вход
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGrid}>
          <InputWithFormatter<LoginUserDto>
            name="email"
            label="Email"
            type="email"
            control={control}
            error={errors.email}
            rules={{
              required: 'Email обязателен',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Неверный формат email',
              },
            }}
          />
          <InputWithFormatter<LoginUserDto>
            name="password"
            label="Пароль"
            type="password"
            control={control}
            error={errors.password}
            rules={{
              required: 'Введите пароль',
            }}
          />
        </div>
        <Button className={styles.button} type="submit">
          Войти
        </Button>
        <div className={styles.linkContainer}>
          <button type="button" className={styles.link} onClick={() => navigate('/register')}>
            Регистрация
          </button>
        </div>
      </form>
    </>
  );
};
