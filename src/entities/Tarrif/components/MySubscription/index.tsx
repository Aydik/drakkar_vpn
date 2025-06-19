import { type FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { formatISODuration, getISODurationFromNow } from 'shared/utils/date.ts';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import type { Subscription } from 'entities/Tarrif/model';
import type { ApiResponse } from 'shared/api/response.ts';
import { getSubscription, setAutorenew } from 'entities/Tarrif/services/tariff.service.ts';
import { Link } from 'react-router-dom';

export const MySubscription: FC = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const fetchSubscription = async () => {
    try {
      const res: ApiResponse = await getSubscription();
      if (res.result) setSubscription(res.result);
      else setSubscription(null);
    } catch (error) {
      console.error(error);
      setSubscription(null);
    }
  };

  const handleAutoRenewButtonClick = async () => {
    if (subscription) {
      await setAutorenew(!subscription.isAutoRenew);
      await fetchSubscription();
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const [duration, setDuration] = useState<string>('P0D');

  useEffect(() => {
    const updateDuration = () => {
      if (subscription) {
        setDuration(getISODurationFromNow(subscription.expiresAt));
      } else setDuration('P0D');
    };

    updateDuration();
    const interval = setInterval(updateDuration, 60_000);

    return () => clearInterval(interval);
  }, [subscription]);

  return (
    <div className={styles.currentTariff}>
      {subscription ? (
        <>
          <Typography className={styles.title}>Моя подписка</Typography>
          <div className={styles.tariff}>
            <Typography className={styles.name}>{subscription.currentTariffName}</Typography>
            <Typography className={styles.info}>Осталось: {formatISODuration(duration)}</Typography>
            <div className={styles.autoRenew}>
              <Typography className={styles.info}>Авто продление:</Typography>
              <button className={styles.autoRenewButton} onClick={handleAutoRenewButtonClick}>
                {subscription.isAutoRenew ? 'Вкл.' : 'Откл.'}
              </button>
            </div>
          </div>
          <Icon
            name={`checkbox-${subscription.isActive ? 'active' : 'disabled'}`}
            size={{ width: 50, height: 50 }}
            className={styles.isActive}
          />
        </>
      ) : (
        <div className={styles.noData}>
          <Typography className={styles.noData_title}>Нет доступных подписок</Typography>
          <Link to={'/catalog'} className={styles.noData_link}>
            Купить
          </Link>
        </div>
      )}
    </div>
  );
};
