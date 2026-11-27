import type { BaseServiceOptions } from '@shared/api';
import { GenderType } from '@shared/constants/genders';
import { UserRoleType } from '@shared/constants/roles';
import { ApplicationStatusType } from '@shared/constants/statuses';
import type { AxiosResponse } from 'axios';
export type EntityId = number | string;
export type NamedEntity = {
   id: EntityId;
   name: string;
};
export type EmployeeType = {
   first_name?: string;
   id?: string;
   last_name?: string;
   role: UserRoleType;
   username: string;
};
export type EmployeeDetails = EmployeeType & {};
export type PaginatedResponse<T> = {
   count: number;
   next: string | null;
   previous: string | null;
   results: T[];
};
export type EmployeePayload = {
   district: EntityId;
   name: string;
   region: EntityId;
};
export type EmployeesParams = {
   district?: EntityId;
   page?: unknown;
   page_size?: unknown;
   region?: EntityId;
   search?: string;
};
export type EmployeeServiceOptions<T> = BaseServiceOptions<AxiosResponse<T>> & {
   id?: EntityId;
   params?: EmployeesParams;
   signal?: AbortSignal;
};
export type Admission = {
   admitted_at: string | null;
   birth_date?: string | null;
   client_created_at: string | null;
   closed_at: string | null;
   closed_by_name?: string | null;
   created_at: string;
   created_by_name: string | null;
   description: string;
   description_by_doctor?: string | null;
   description_by_inspector?: string | null;
   district_name: string | null;
   first_name: string | null;
   found_address: string;
   gender?: GenderType | string;
   id: string;
   inspector_name?: string;
   last_name: string | null;
   match_score: string | null;
   number: string | null;
   passport_number?: string | null;
   person: string;
   person_name: string | null;
   pinfl: string | null;
   placed_at: string | null;
   placed_by_name?: string | null;
   placement: string;
   region_name: string | null;
   status: string;
   status_code: ApplicationStatusType | null | undefined;
   status_name: string;
};
export type AdmissionsParams = {
   inspector_name?: string;
   page?: number;
   page_size?: number;
   person_name?: string;
   status?: string;
};
export type AdmissionServiceOptions<T> = BaseServiceOptions<
   AxiosResponse<T>
> & {
   headers?: Record<string, string>;
   id?: EntityId;
   params?: AdmissionsParams;
   signal?: AbortSignal;
};
