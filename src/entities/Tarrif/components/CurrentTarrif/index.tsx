import { type FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { formatISODuration, getISODurationFromNow } from 'shared/utils/date.ts';
import { Icon } from 'shared/ui/Icon/Icon.tsx';

export const CurrentTariff: FC = () => {
  const currentTariffName = 'Premium 300';
  const expiresAt = '2025-08-01T00:00:00';
  const isActive = true;
  const [isAutoRenew, setIsAutoRenew] = useState<boolean>(false);

  const [duration, setDuration] = useState<string>('P0D');

  useEffect(() => {
    const updateDuration = () => {
      setDuration(getISODurationFromNow(expiresAt));
    };

    updateDuration();
    const interval = setInterval(updateDuration, 60_000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleAutoRenewButtonClick = () => {
    setIsAutoRenew((prev) => !prev);
  };

  return (
    <div className={styles.currentTariff}>
      <Typography className={styles.title}>Моя подписка</Typography>
      <div className={styles.tariff}>
        <Typography className={styles.name}>{currentTariffName}</Typography>
        <Typography className={styles.info}>Осталось: {formatISODuration(duration)}</Typography>
        <div className={styles.autoRenew}>
          <Typography className={styles.info}>Авто продление:</Typography>
          <button className={styles.autoRenewButton} onClick={handleAutoRenewButtonClick}>
            {isAutoRenew ? 'Вкл.' : 'Откл.'}
          </button>
        </div>
      </div>
      <Icon
        name={`checkbox-${isActive ? 'active' : 'disabled'}`}
        size={{ width: 50, height: 50 }}
        className={styles.isActive}
      />
    </div>
  );
};
