export const ApplicationLanguage = {
  RUSSIAN: 'ru',
  ENGLISH: 'en',
};

export const DefaultApplicationLanguage = {
  DEFAULT: ApplicationLanguage.RUSSIAN,
};

export const RegexConstants = {
  EMAIL:
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
  PASSWORD: /^[A-Za-z0-9!@#$%\^\&*\)\(+=._-]{4,32}$/,
};

export const ApplicationRoutes = {
  HOME: '/',
  PROFILE: '/profile',
  EXPENSE_ITEM: '/expense-item',
};
