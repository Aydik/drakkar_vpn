import type { Device } from 'features/Devices/model';
import type { FC, ReactNode } from 'react';
import { formatISOString } from 'shared/utils/date.ts';
import { Table } from 'shared/ui/Table';
import { DeleteButton } from 'shared/ui/DeleteButton';
import { OpenConfigButton } from 'features/Devices/components/OpenConfigButton';

interface Props {
  devices: Device[];
  updateDevices: () => void;
}

export const DevicesTable: FC<Props> = ({ devices }) => {
  const headers: Record<string, ReactNode> = {
    createdAt: 'Дата создания',
    deviceName: 'Название',
    config: 'Показать конфиг',
    delete: 'Удалить',
  };

  const sanitizeDevices = (devices: Device[]): Record<string, ReactNode>[] => {
    return devices.map((device: Device) => ({
      createdAt: formatISOString(device.createdAt),
      deviceName: device.deviceName,
      config: <OpenConfigButton device={device} />,
      delete: (
        <DeleteButton
          onClick={() => {
            console.log(`Delete device id=${device.deviceId}`);
          }}
        />
      ),
    }));
  };

  return <Table headers={headers} data={sanitizeDevices(devices)} />;
};
