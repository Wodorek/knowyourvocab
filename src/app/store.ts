import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import diagnosisReducer from '../features/diagnosis/diagnosisSlice';
import questionsReducer from '../features/QuestionBox/questionsSlice';
import answersReducer from '../features/AnswersTable/answersSlice';

export const store = configureStore({
  reducer: {
    diagnosis: diagnosisReducer,
    questions: questionsReducer,
    answers: answersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
