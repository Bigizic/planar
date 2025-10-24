import { configureStore } from '@reduxjs/toolkit';
import { boqReducer } from '@/containers/Homepage/reducer';
import { preliminaryReducer } from '@/containers/Preliminary/reducer';

export const store = configureStore({
  reducer: {
    boq: boqReducer,
    preliminary: preliminaryReducer,
    // Add more reducers here as you create them
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
