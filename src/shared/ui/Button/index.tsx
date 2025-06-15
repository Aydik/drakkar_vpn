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
}

export const Button: FC<Props> = ({
  children,
  onClick,
  className,
  variant,
  type = 'button',
  style,
}) => {
  let styleClass;
  switch (variant) {
    case 'primary':
      styleClass = styles.button_primary;
      break;
    case 'secondary':
      styleClass = styles.button_secondary;
      break;
    case 'accent':
      styleClass = styles.button_accent;
      break;
    default:
      styleClass = '';
  }
  return (
    <button
      onClick={onClick}
      className={clsx(styles.button, styleClass, className)}
      type={type}
      style={style}
    >
      {children}
    </button>
  );
};
