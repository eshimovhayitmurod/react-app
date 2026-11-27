export const statuses = [
   {
      badge: 'bg-[#2F74D01A] dark:bg-[#7AB0F024] text-[#2F74D0] dark:text-[#7AB0F0]',
      color: '#3987E5',
      dot: 'bg-[#2F74D0] dark:bg-[#7AB0F0]',
      filter: ['all'],
      key: 'total',
      label: 'Barchasi',
      label_en: 'All',
      label_ru: 'Все',
      label_uz: 'Barchasi',
      'label_uz-cyrillic': 'Барчаси',
      value: '',
   },
   {
      badge: 'bg-[#C2700F1A] dark:bg-[#F5A54A24] text-[#C2700F] dark:text-[#F5A54A]',
      color: '#E8912D',
      dot: 'bg-[#C2700F] dark:bg-[#F5A54A]',
      filter: ['all', 'required'],
      key: 'registered',
      label: "Ro'yxatga olingan",
      label_en: 'Registered',
      label_ru: 'Зарегистрирован',
      label_uz: "Ro'yxatga olingan",
      'label_uz-cyrillic': 'Рўйхатга олинган',
      value: 'registered',
   },
   {
      badge: 'bg-[#13845D1A] dark:bg-[#4FD1A124] text-[#13845D] dark:text-[#4FD1A1]',
      color: '#199E70',
      dot: 'bg-[#13845D] dark:bg-[#4FD1A1]',
      filter: ['all', 'required'],
      key: 'closed',
      label: 'Ruxsat berilgan',
      label_en: 'Released',
      label_ru: 'Освобождён',
      label_uz: 'Ruxsat berilgan',
      'label_uz-cyrillic': 'Рухсат берилган',
      value: 'closed',
   },
] as const;
export const statusesList = statuses.map(role => role?.value);
export type ApplicationStatusType = (typeof statuses)[number]['value'];
export type ApplicationStatusOption = (typeof statuses)[number];
export type ApplicationStatusFilterType =
   | (typeof statuses)[number]['filter'][number]
   | undefined;
