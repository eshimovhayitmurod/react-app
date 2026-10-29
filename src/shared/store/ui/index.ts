import { createSlice } from '@reduxjs/toolkit';
const initialState = {
   // sidebarCollapsed: true,
   theme: 'light',
};
export const uiSlice = createSlice({
   name: 'ui',
   initialState,
   reducers: {
      // toggleSidebar(state, { payload }) {
      //    window.localStorage.setItem(
      //       'sidebar-collapsed',
      //       JSON.stringify(payload),
      //    );
      //    state.sidebarCollapsed = payload;
      // },
      changeTheme(state, { payload }) {
         state.theme = payload;
      },
   },
});
export const {
   //  toggleSidebar,
   changeTheme,
} = uiSlice.actions;
export default uiSlice.reducer;
