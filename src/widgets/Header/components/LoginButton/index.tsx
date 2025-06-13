import type { FC } from 'react';
import styles from './index.module.scss';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import { Typography } from 'shared/ui/Typography';
import { useNavigate } from 'react-router-dom';

export const LoginButton: FC = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/login');
  return (
    <>
      <button className={styles.loginButton} onClick={handleClick}>
        <Icon name={'login'} />
        <Typography className={styles.title}>Войти</Typography>
      </button>
    </>
  );
};
