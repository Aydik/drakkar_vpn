export const formatISODuration = (duration: string): string => {
  const regex = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?)?$/;
  const match = duration.match(regex);

  if (!match) return 'Неверный формат';

  const [, days, hours, minutes] = match;

  const parts = [];
  if (days) parts.push(`${days} дн.`);
  if (hours) parts.push(`${hours} ч.`);
  if (minutes) parts.push(`${minutes} мин.`);

  return parts.length > 0 ? parts.join(' ') : '0 мин.';
};

export const getISODurationFromNow = (isoString: string): string => {
  const now = new Date();
  const target = new Date(isoString);
  const diffMs = Math.abs(target.getTime() - now.getTime());

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  let iso = 'P';
  if (days > 0) iso += `${days}D`;
  if (hours > 0 || minutes > 0) {
    iso += 'T';
    if (hours > 0) iso += `${hours}H`;
    if (minutes > 0) iso += `${minutes}M`;
  }
  return iso;
};
