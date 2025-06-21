import type { Device } from 'features/Devices/model';
import type { FC, ReactNode } from 'react';
import { formatISOString } from 'shared/utils/date.ts';
import { Table } from 'shared/ui/Table';
import { DeleteButton } from 'shared/ui/DeleteButton';
import { OpenConfigButton } from 'features/Devices/components/OpenConfigButton';
import { deleteTariff } from 'features/admin/Tariffs/services/tariffs.service.ts';

interface Props {
  devices: Device[];
  updateDevices: () => void;
}

export const DevicesTable: FC<Props> = ({ devices, updateDevices }) => {
  const headers: Record<string, ReactNode> = {
    createdAt: 'Дата создания',
    deviceName: 'Название',
    config: 'Показать конфиг',
    delete: 'Удалить',
  };

  const handleDeleteTariff = async (id: string) => {
    try {
      await deleteTariff(id);
      updateDevices();
    } catch (error) {
      console.error(error);
    }
  };

  const sanitizeDevices = (devices: Device[]): Record<string, ReactNode>[] => {
    return devices.map((device: Device) => ({
      createdAt: formatISOString(device.createdAt),
      deviceName: device.deviceName,
      config: <OpenConfigButton device={device} />,
      delete: <DeleteButton onClick={() => handleDeleteTariff(device.deviceId)} />,
    }));
  };

  return <Table headers={headers} data={sanitizeDevices(devices)} />;
};
