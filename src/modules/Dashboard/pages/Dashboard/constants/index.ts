import type { StatisticsComposition } from '@modules/Dashboard/types';
import { StatusResponseDataType } from '../types';
export const defaultStatuses: StatusResponseDataType = {
   closed: 0,
   placed: 0,
   registered: 0,
   total: 0,
};
export const defaultComposition: StatisticsComposition = {
   age: { age_18_35: 0, over_35: 0, unidentified: 0, under_18: 0 },
   gender: { female: 0, male: 0, unidentified: 0 },
   repeat_visits: { once: 0, three_or_more: 0, twice: 0 },
   time_of_day: { day: 0, evening: 0, morning: 0, night: 0 },
};
export const cardClass =
   'spotlight-card rounded-2xl border border-solid border-[#e2e7ee] dark:border-[#232d3b] bg-[#FFFFFF] dark:bg-[#121822]';
