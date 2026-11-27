import type { BaseServiceOptions } from '@shared/api';
import type { AxiosResponse } from 'axios';
export type EntityId = number | string;
export type CitizenType = {
   value: number;
   label: string;
   id: string;
};
export type SoberingCenterType = {
   value: number;
   label: string;
   id: string;
};
export type InspectorType = {
   value: number;
   label: string;
   id: string;
};
export type NamedEntity = {
   id: EntityId;
   name: string;
};
export type StatisticsSummary = {
   closed: number;
   district: NamedEntity | null;
   placed: number;
   region: NamedEntity | null;
   registered: number;
   total: number;
};
export type StatisticsByDistrict = {
   closed_count: number;
   district_id: EntityId;
   district_name: string;
   placed_count: number;
   registered_count: number;
};
export type StatisticsByRegion = {
   closed_count: number;
   districts: StatisticsByDistrict[];
   placed_count: number;
   region_id: EntityId;
   region_name: string;
   registered_count: number;
};
export type StatisticsComposition = {
   age: {
      age_18_35: number;
      over_35: number;
      unidentified: number;
      under_18: number;
   };
   gender: {
      female: number;
      male: number;
      unidentified: number;
   };
   repeat_visits: {
      once: number;
      three_or_more: number;
      twice: number;
   };
   time_of_day: {
      day: number;
      evening: number;
      morning: number;
      night: number;
   };
};
export type StatisticsSummaryParams = {
   district?: EntityId;
   region?: EntityId;
};
export type DashboardServiceOptions<T> = BaseServiceOptions<
   AxiosResponse<T>
> & {
   params?: StatisticsSummaryParams;
   signal?: AbortSignal;
};
