import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'shared/ui/Button';
import { Typography } from 'shared/ui/Typography';
import styles from 'features/Auth/styles/index.module.scss';
import { InputWithFormatter } from 'features/Auth/components/ui/InputWithFormatter';
import { AxiosError } from 'axios';
import type { CreateUserDto } from 'features/Auth/model';
import { useNavigate } from 'react-router-dom';
import { authUser, registerUser } from 'features/Auth/services/auth.service.ts';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'app/store';
import { updateUser } from 'entities/User/slice';
import type { ApiResponse } from 'shared/api/response.ts';

interface RegisterFormFields extends CreateUserDto {
  confirmPassword: string;
}

export const RegisterForm: FC = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
  } = useForm<RegisterFormFields>();

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormFields) => {
    try {
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      await authUser({
        email: data.email,
        password: data.password,
      });
      await dispatch(updateUser());
      navigate('/profile');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const message =
        axiosError?.response?.data?.errorMessages?.[0] || 'Произошла ошибка регистрации';

      setError('email', {
        type: 'manual',
        message,
      });
    }
  };

  const passwordValue = watch('password');

  return (
    <>
      <Typography variant="h4" className={styles.title}>
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGrid}>
          <InputWithFormatter<RegisterFormFields>
            name="fullName"
            label="Имя пользователя"
            type="text"
            control={control}
            error={errors.fullName}
            rules={{
              required: 'Введите имя пользователя',
              minLength: {
                value: 6,
                message: 'Имя должно содержать минимум 6 символов',
              },
              maxLength: {
                value: 50,
                message: 'Имя должно содержать максимум 50 символов',
              },
            }}
          />
          <InputWithFormatter<RegisterFormFields>
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
          <InputWithFormatter<RegisterFormFields>
            name="password"
            label="Пароль"
            type="password"
            control={control}
            error={errors.password}
            rules={{
              required: 'Пароль обязателен',
              minLength: {
                value: 6,
                message: 'Пароль должен содержать минимум 6 символов',
              },
              validate: (value: string | undefined) => {
                if (!value) return false;
                const hasUpperCase = /[A-ZА-Я]/.test(value);
                const hasNumber = /\d/.test(value);

                if (!hasUpperCase) {
                  return 'Пароль должен содержать хотя бы одну заглавную букву';
                }
                if (!hasNumber) {
                  return 'Пароль должен содержать хотя бы одну цифру';
                }
                return true;
              },
            }}
          />
          <InputWithFormatter<RegisterFormFields>
            name="confirmPassword"
            label="Подтверждение пароля"
            type="password"
            control={control}
            error={errors.confirmPassword}
            rules={{
              required: 'Подтвердите пароль',
              validate: (value: string | undefined) => {
                return value === passwordValue || 'Пароли не совпадают';
              },
            }}
          />
        </div>
        <Button className={styles.button} type="submit">
          Зарегистрироваться
        </Button>
        <div className={styles.linkContainer}>
          <button type="button" className={styles.link} onClick={() => navigate('/login')}>
            Я уже зарегистрировался(-ась)
          </button>
        </div>
      </form>
    </>
  );
};
