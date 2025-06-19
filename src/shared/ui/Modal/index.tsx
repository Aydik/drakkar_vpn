import { type FC, type ReactNode, type MouseEvent, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';

interface Props {
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<Props> = ({ isOpened, onClose, children }) => {
  const mouseDownTarget = useRef<EventTarget | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpened ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpened]);

  if (!isOpened) return null;

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    mouseDownTarget.current = e.target;
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (mouseDownTarget.current === e.currentTarget && e.target === e.currentTarget) {
      onClose();
    }
    mouseDownTarget.current = null;
  };

  return ReactDOM.createPortal(
    <div className={styles.background} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <div className={styles.modal}>{children}</div>
    </div>,
    document.getElementById('modal-root')!,
  );
};
