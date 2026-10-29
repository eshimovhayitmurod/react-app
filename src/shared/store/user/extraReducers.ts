import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { baseAPI } from '@shared/api';
import dateFormatter from '@shared/helpers/dateFormatter';
import type { UserState } from './index';
export interface CompanyItem {
   id: number | string;
   name: string;
   tin?: string;
   [key: string]: unknown;
}
export interface CompaniesApiResponse {
   data?: { results?: CompanyItem[] };
}
export interface UserStatusData {
   vat_status?: string;
   status_code?: number;
   [key: string]: unknown;
}
export interface UserStatusApiResponse {
   data?: {
      data?: UserStatusData;
   };
}
export const getUserStatus = createAsyncThunk<
   UserStatusApiResponse,
   string | number,
   { rejectValue: unknown }
>('user/getUserStatus', async (tin, { rejectWithValue }) => {
   try {
      const facturaDate = dateFormatter(new Date()).format('DD.MM.YYYY');
      const options = {
         data: { inn: tin, facturaDate },
         method: 'POST',
         url: '/edo_v2/external/vat-status/',
      };
      const response = await baseAPI<UserStatusApiResponse>(options);
      return response.data;
   } catch (error) {
      return rejectWithValue(error);
   }
});
const extraReducers = (builder: ActionReducerMapBuilder<UserState>): void => {
   builder
      // getUserStatus
      .addCase(getUserStatus.pending, state => {
         state.userStatus = null;
         state.userStatusStatus = 'LOADING';
      })
      .addCase(getUserStatus.fulfilled, (state, { payload }) => {
         state.userStatus = payload?.data ?? null;
         state.userStatusStatus = 'SUCCESS';
      })
      .addCase(getUserStatus.rejected, state => {
         state.userStatus = null;
         state.userStatusStatus = 'ERROR';
      });
};
export default extraReducers;
