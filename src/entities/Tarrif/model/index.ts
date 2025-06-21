export interface Tariff {
  id: string;
  name: string;
  description: string;
  price: number;
  durationInDays: number;
  maxDevices: number;
}

export type TariffWithoutId = Omit<Tariff, 'id'>;

export interface Subscription {
  currentTariffName: string;
  expiresAt: string;
  isAutoRenew: true;
  isActive: true;
}
