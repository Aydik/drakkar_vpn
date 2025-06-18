import { type FC, useEffect, useRef, useState } from 'react';
import { Typography } from 'shared/ui/Typography';
import styles from './index.module.scss';

export const IndexPage: FC = () => {
  const speed = 50;
  const title = 'Вас приветствует Drakkar VPN';
  const description = 'Здесь должен был быть красивый лендинг, но мне его лень делать...';

  const [displayedTitle, setDisplayedTitle] = useState<string>('');
  const [displayedDescription, setDisplayedDescription] = useState<string>('');

  const titleIndex = useRef(0);
  const descIndex = useRef(0);

  useEffect(() => {
    let titleTimeout: number;

    const typeTitle = () => {
      if (titleIndex.current < title.length) {
        setDisplayedTitle(title.slice(0, titleIndex.current + 1));
        titleIndex.current += 1;
        titleTimeout = window.setTimeout(typeTitle, speed);
      } else {
        typeDescription();
      }
    };

    let descTimeout: number;

    const typeDescription = () => {
      if (descIndex.current < description.length) {
        setDisplayedDescription(description.slice(0, descIndex.current + 1));
        descIndex.current += 1;
        descTimeout = window.setTimeout(typeDescription, speed);
      }
    };

    typeTitle();

    return () => {
      clearTimeout(titleTimeout);
      clearTimeout(descTimeout);
    };
  }, [title, description, speed]);

  return (
    <div className={styles.indexPage}>
      <div className={styles.textContainer}>
        <Typography variant={'h1'} className={styles.title}>
          {displayedTitle}
        </Typography>
        <Typography variant={'h2'} className={styles.description}>
          {displayedDescription}
        </Typography>
      </div>
    </div>
  );
};
