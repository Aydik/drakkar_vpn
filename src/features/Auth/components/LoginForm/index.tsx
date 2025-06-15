import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'shared/ui/Button';
import { Typography } from 'shared/ui/Typography';
import styles from 'features/Auth/styles/index.module.scss';
import { InputWithFormatter } from 'features/Auth/components/ui/InputWithFormatter';
// import { authUser } from 'features/Auth/services/auth.service.ts';
import { AxiosError } from 'axios';
import type { LoginUserDto } from 'features/Auth/model';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from 'app/store';
// import { setUser } from 'entities/User/slice';
import { useNavigate } from 'react-router-dom';

export const LoginForm: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<LoginUserDto>();

  // const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginUserDto) => {
    try {
      console.log(data);
      // const res = await authUser({
      //   email: data.email,
      //   password: data.password,
      // });
      // dispatch(setUser(res));
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        setError('password', {
          type: 'manual',
          message: 'Неверный email или пароль',
        });
      } else {
        console.error('Ошибка авторизации:', error);
      }
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
              minLength: {
                value: 6,
                message: 'Пароль должен содержать минимум 6 символов',
              },
            }}
          />
        </div>
        <Button variant="primary" className={styles.button} type="submit">
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
