import type { FC, ReactNode } from 'react';
import styles from './index.module.scss';

interface Props {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  children: ReactNode;
}

export const Typography: FC<Props> = ({ variant = 'span', className = '', children }) => {
  const finalClassName: string = `${styles.typography} ${styles[variant]} ${className}`;

  switch (variant) {
    case 'h1':
      return <h1 className={finalClassName}>{children}</h1>;
    case 'h2':
      return <h2 className={finalClassName}>{children}</h2>;
    case 'h3':
      return <h3 className={finalClassName}>{children}</h3>;
    case 'h4':
      return <h4 className={finalClassName}>{children}</h4>;
    case 'h5':
      return <h5 className={finalClassName}>{children}</h5>;
    case 'h6':
      return <h6 className={finalClassName}>{children}</h6>;
    case 'p':
      return <p className={finalClassName}>{children}</p>;
    case 'span':
    default:
      return <span className={finalClassName}>{children}</span>;
  }
};
