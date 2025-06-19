import type { NavLink } from 'widgets/Header/types';

export const UNAUTHORIZED_PAGES: NavLink[] = [
  { url: '/', text: 'Главная' },
  { url: '/catalog', text: 'Каталог' },
];

export const AUTHORIZED_PAGES: NavLink[] = [
  { url: '/support', text: 'Тех. поддержка' },
  { url: '/profile', text: 'Профиль' },
];
