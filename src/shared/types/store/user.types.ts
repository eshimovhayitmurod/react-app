export type UserDataType =
   | {
        address?: string;
        bank_account?: string;
        current_date?: string;
        director?: string | null;
        director_pinfl?: string | null;
        director_tin?: string | null;
        email?: string | null;
        first_name?: string | null;
        id?: number | string;
        ip?: string;
        last_name?: string | null;
        mfo?: string | null;
        name?: string;
        phone_number?: string | null;
        status?: string | null;
        tin?: string;
        type?: string | null;
        [key: string]: unknown;
     }
   | null
   | undefined;
