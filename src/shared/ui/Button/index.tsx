import type { CSSProperties, FC, ReactNode } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

interface Props {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
  size?: 'small' | 'medium' | 'large';
}

export const Button: FC<Props> = ({
  children,
  onClick,
  className,
  variant = 'primary',
  type = 'button',
  style,
  size = 'medium',
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        styles.button,
        styles[`button_${size}`],
        styles[`button_${variant}`],
        className,
      )}
      type={type}
      style={style}
    >
      {children}
    </button>
  );
};
