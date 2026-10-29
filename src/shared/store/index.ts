import { configureStore } from '@reduxjs/toolkit';
import ui from './ui';
import user from './user';
export const store = configureStore({
   devTools: false,
   reducer: { user, ui },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }),
});
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
