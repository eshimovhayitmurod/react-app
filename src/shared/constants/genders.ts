export const genders = [
   {
      label: 'Erkak',
      label_en: 'Male',
      label_ru: 'Мужской',
      label_uz: 'Erkak',
      'label_uz-cyrillic': 'Эркак',
      value: 'male',
   },
   {
      label: 'Ayol',
      label_en: 'Female',
      label_ru: 'Женский',
      label_uz: 'Ayol',
      'label_uz-cyrillic': 'Аёл',
      value: 'female',
   },
] as const;
export const gendersList = genders.map(gender => gender.value);
export type GenderType = (typeof genders)[number]['value'] | null | string;
export type GenderOption = (typeof genders)[number];
