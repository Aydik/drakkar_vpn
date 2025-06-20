import type { Device } from 'features/Devices/model';
import type { FC, ReactNode } from 'react';
import { formatISOString } from 'shared/utils/date.ts';
import { Table } from 'shared/ui/Table';
import { DeleteDeviceButton } from 'features/Devices/components/DeleteDeviceButton';
import { CreateQrButton } from 'features/Devices/components/CreateQrButton';

interface Props {
  devices: Device[];
  updateDevices: () => void;
}

export const DevicesTable: FC<Props> = ({ devices }) => {
  const headers: Record<string, ReactNode> = {
    createdAt: 'Дата создания',
    deviceName: 'Название',
    assignedIp: 'IP адрес',
    createQR: 'Сгенерировать QR',
    delete: 'Удалить',
  };

  const sanitizeDevices = (devices: Device[]): Record<string, ReactNode>[] => {
    return devices.map((device: Device) => ({
      createdAt: formatISOString(device.createdAt),
      deviceName: device.deviceName,
      assignedIp: device.assignedIp,
      createQR: <CreateQrButton config={device.serverConfig} />,
      delete: <DeleteDeviceButton />,
    }));
  };

  return <Table headers={headers} data={sanitizeDevices(devices)} />;
};
