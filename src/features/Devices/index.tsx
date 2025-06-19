import { type FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import type { ApiResponse } from 'shared/api/response.ts';
import type { Device as DeviceType, DevicesResponse } from 'features/Devices/model';
import { getDevices } from 'features/Devices/services/device.service.ts';
import { DevicesTable } from 'features/Devices/components/DevicesTable';
import { AddDeviceButton } from 'features/Devices/components/AddDeviceButton';

export const Devices: FC = () => {
  const [devices, setDevices] = useState<DeviceType[]>([]);
  const [maxDevices, setMaxDevices] = useState<number>(0);

  const fetchDevices = async () => {
    try {
      const res: ApiResponse = await getDevices();
      if (res.result) {
        const data: DevicesResponse = res.result;
        setMaxDevices(data.maxDevices);
        setDevices(data.devices);
      }
    } catch (error) {
      console.error(error);
      setMaxDevices(0);
      setDevices([]);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div className={styles.devices}>
      <div className={styles.caption}>
        <Typography variant={'h3'}>Мои устройства</Typography>
        <div className={styles.info}>
          <Typography className={styles.devicesCount}>
            {devices.length} / {maxDevices}
          </Typography>
          <AddDeviceButton updateDevices={fetchDevices} />
        </div>
      </div>
      {devices.length ? (
        <DevicesTable devices={devices} updateDevices={fetchDevices} />
      ) : (
        <Typography variant={'p'} className={styles.noData}>
          У вас нет добавленных устройств
        </Typography>
      )}
    </div>
  );
};
