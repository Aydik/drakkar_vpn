import { type FC, useState } from 'react';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import styles from './index.module.scss';

interface Props {
  text: string;
}

export const CopyButton: FC<Props> = ({ text }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.error('Ошибка копирования: ', err);
    }
  };

  return (
    <button className={styles.button} onClick={handleCopy}>
      <Icon name={isCopied ? 'done' : 'copy'} />
    </button>
  );
};
