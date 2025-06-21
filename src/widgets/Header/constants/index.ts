import type { NavLink } from 'widgets/Header/types';

export const UNAUTHORIZED_PAGES: NavLink[] = [
  { url: '/', text: 'Главная' },
  { url: '/catalog', text: 'Каталог' },
];

export const AUTHORIZED_PAGES: NavLink[] = [
  { url: '/support', text: 'Тех. поддержка' },
  { url: '/profile', text: 'Профиль' },
];

export const ADMIN_PAGES: NavLink[] = [
  { url: '/admin/tariffs', text: 'Тарифы' },
  { url: '/admin/logs', text: 'Логи' },
];
