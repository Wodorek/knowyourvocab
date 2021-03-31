import { createSlice } from '@reduxjs/toolkit';

export const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState: {
    correct: [] as string[],
    incorrect: [] as string[],
  },
  reducers: {
    addCorrect: (state, action) => {
      state.correct.push(action.payload);
    },
    addIncorrect: (state, action) => {
      state.incorrect.push(action.payload);
    },
  },
});

export const { addCorrect, addIncorrect } = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
