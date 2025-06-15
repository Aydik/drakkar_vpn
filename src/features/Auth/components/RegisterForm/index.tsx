import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'shared/ui/Button';
import { Typography } from 'shared/ui/Typography';
import styles from 'features/Auth/styles/index.module.scss';
import { InputWithFormatter } from 'features/Auth/components/ui/InputWithFormatter';
// import { registerUser } from 'features/Auth/services/auth.service.ts';
import { AxiosError } from 'axios';
import type { CreateUserDto } from 'features/Auth/model';
import { useNavigate } from 'react-router-dom';
// import { setUser } from 'entities/User/slice';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from 'app/store';

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

  // const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: RegisterFormFields) => {
    try {
      console.log(data);
      // const res = await registerUser({
      //   email: data.email,
      //   password: data.password,
      // });
      // dispatch(setUser(res));
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        setError('email', {
          type: 'manual',
          message: 'Email уже используется',
        });
      } else {
        console.error('Ошибка регистрации:', error);
      }
    }
  };

  const passwordValue = watch('password');
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h4" className={styles.title}>
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGrid}>
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
        <Button variant="primary" className={styles.button} type="submit">
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
