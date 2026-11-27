import type { UserRoleType } from '@shared/constants/roles';
export type UserDataType = {
   first_name?: string | null;
   id?: number | string;
   last_name?: string | null;
   name?: string;
   status?: string | null;
   role: UserRoleType;
   [key: string]: unknown;
} | null;
