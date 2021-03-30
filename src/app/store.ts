import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import diagnosisReducer from '../features/diagnosis/diagnosisSlice';

export const store = configureStore({
  reducer: {
    diagnosis: diagnosisReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
