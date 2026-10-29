import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDataType } from '@shared/types/store/user.types';
import extraReducers from './extraReducers';
export type LoadingStatus =
   | 'LOADING'
   | 'SUCCESS'
   | 'WELCOME'
   | 'ERROR'
   | 'SERVER_ERROR';
export interface SubscriptionPlanDetails {
   id?: number | string;
   title?: string;
   [key: string]: unknown;
}
export interface UserState {
   STATUS: LoadingStatus;
   user: UserDataType;
   userStatus: unknown | null;
   userStatusStatus: LoadingStatus;
}
const initialState: UserState = {
   STATUS: 'LOADING',
   user: null,
   userStatus: null,
   userStatusStatus: 'LOADING',
};
export interface AuthorizationPayload {
   STATUS: LoadingStatus;
   user: UserDataType;
}
export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      authorization(state, action: PayloadAction<AuthorizationPayload>) {
         if (action.payload?.STATUS) {
            state.STATUS = action.payload.STATUS;
         }
         if (action.payload?.user) {
            state.user = action.payload.user;
         }
      },
      resetUser(): UserState {
         return { ...initialState, STATUS: 'ERROR' };
      },
      updateUser(state, action: PayloadAction<UserDataType>) {
         state.user = action.payload;
      },
   },
   extraReducers,
});
export const { authorization, resetUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
