export interface Tariff {
  name: string;
  description: string;
  price: number;
  durationInDays: number;
  limitations: number;
}

export interface CurrentTariff {
  currentTariffName: string;
  expiresAt: string;
  isAutoRenew: true;
  isActive: true;
}
