import type { ApplicationStatusType } from '@shared/constants/statuses';
export type FilterState = {
   inspector_name: string;
   page: number;
   page_size: number;
   person_name: string;
   status: ApplicationStatusType;
};
export type StatusCountsType = {
   all: number;
   closed: number;
   placed: number;
   registered: number;
};
