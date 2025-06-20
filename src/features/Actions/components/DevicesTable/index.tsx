import type { Device } from 'features/Devices/model';
import type { FC } from 'react';
// import styles from './index.module.scss';

interface Props {
  devices: Device[];
  updateDevices: () => void;
}

export const DevicesTable: FC<Props> = ({ devices }) => {
  return JSON.stringify(devices);
};
