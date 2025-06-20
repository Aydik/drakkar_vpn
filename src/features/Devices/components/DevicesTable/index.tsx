import type { Device } from 'features/Devices/model';
import type { FC, ReactNode } from 'react';
import { formatISOString } from 'shared/utils/date.ts';
import { Table } from 'shared/ui/Table';
import { DeleteDeviceButton } from 'features/Devices/components/DeleteDeviceButton';
import { OpenConfigButton } from 'features/Devices/components/OpenConfigButton';

interface Props {
  devices: Device[];
  updateDevices: () => void;
}

export const DevicesTable: FC<Props> = ({ devices }) => {
  const headers: Record<string, ReactNode> = {
    createdAt: 'Дата создания',
    deviceName: 'Название',
    assignedIp: 'IP адрес',
    config: 'Показать конфиг',
    delete: 'Удалить',
  };

  const sanitizeDevices = (devices: Device[]): Record<string, ReactNode>[] => {
    return devices.map((device: Device) => ({
      createdAt: formatISOString(device.createdAt),
      deviceName: device.deviceName,
      assignedIp: device.assignedIp,
      config: <OpenConfigButton device={device} />,
      delete: <DeleteDeviceButton />,
    }));
  };

  return <Table headers={headers} data={sanitizeDevices(devices)} />;
};
