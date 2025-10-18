import { configureStore } from '@reduxjs/toolkit';
import { boqReducer } from '@/containers/Homepage/reducer';

export const store = configureStore({
  reducer: {
    boq: boqReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
