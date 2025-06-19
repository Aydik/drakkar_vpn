export interface ServerConfig {
  publicKey: string;
  endpoint: string;
  allowedIPs: string;
  persistentKeepalive: number;
}

export interface Device {
  deviceId: string;
  deviceName: string;
  createdAt: string;
  assignedIp: string;
  serverConfig: ServerConfig;
}

export interface CreateDeviceDto {
  deviceName: string;
  publicKey: string;
}

export interface DevicesResponse {
  maxDevices: number;
  devices: Device[];
}
