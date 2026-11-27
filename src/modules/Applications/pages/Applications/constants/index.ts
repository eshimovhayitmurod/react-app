import type { FilterState, StatusCountsType } from '../types';
export const defaultCounts: StatusCountsType = {
   all: 0,
   closed: 0,
   placed: 0,
   registered: 0,
};
export const defaultFilter: FilterState = {
   inspector_name: '',
   page: 1,
   page_size: 20,
   person_name: '',
   status: '',
};
const defaultStatusMeta = {
   badge: 'bg-[#EDF1F6] dark:bg-[#1E2733] text-[#5E6B7D] dark:text-[#8A97A8]',
   dot: 'bg-[#5E6B7D] dark:bg-[#8A97A8]',
};
const statusMeta: Record<string, { badge: string; dot: string }> = {
   registered: {
      badge: 'bg-[#2F6FEB1A] dark:bg-[#5B9BFF24] text-[#2F6FEB] dark:text-[#5B9BFF]',
      dot: 'bg-[#2F6FEB] dark:bg-[#5B9BFF]',
   },
   placed: {
      badge: 'bg-[#0B8A5F1A] dark:bg-[#3DD6A61F] text-[#0B8A5F] dark:text-[#3DD6A6]',
      dot: 'bg-[#0B8A5F] dark:bg-[#3DD6A6]',
   },
   closed: {
      badge: 'bg-[#D230481A] dark:bg-[#FF7A7A24] text-[#D23048] dark:text-[#FF7A7A]',
      dot: 'bg-[#D23048] dark:bg-[#FF7A7A]',
   },
};
export const getStatusMeta = (code: string) =>
   statusMeta[code] ?? defaultStatusMeta;
