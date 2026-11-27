export const roles = [
   {
      filter: ['all'],
      label: 'Super administrator',
      label_en: 'Super administrator',
      label_ru: 'Super administrator',
      label_uz: 'Super administrator',
      'label_uz-cyrillic': 'Бош администратор',
      value: 'super_admin',
   },
   {
      filter: ['all', 'view_republic_application', 'register'],
      label: 'Simple',
      label_en: 'Simple',
      label_ru: 'Simple',
      label_uz: 'Simple',
      'label_uz-cyrillic': 'Республика ходими',
      value: 'simple',
   },
   {
      filter: ['all', 'view_republic_application', 'register'],
      label: 'Employee',
      label_en: 'Employee',
      label_ru: 'Employee',
      label_uz: 'Employee',
      'label_uz-cyrillic': 'Employee',
      value: 'employee',
   },
] as const;
export const rolesList = roles.map(role => role?.value);
export type UserRoleType = (typeof roles)[number]['value'];
export type UserRoleOption = (typeof roles)[number];
export type RoleFilterType =
   | (typeof roles)[number]['filter'][number]
   | undefined;
