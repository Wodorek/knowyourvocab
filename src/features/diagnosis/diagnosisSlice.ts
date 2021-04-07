import { createSlice } from '@reduxjs/toolkit';

export const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState: {
    correct: [] as string[],
    incorrect: [] as string[],
    isOn: false,
  },
  reducers: {
    addCorrect: (state, action) => {
      state.correct.push(action.payload);
    },
    addIncorrect: (state, action) => {
      state.incorrect.push(action.payload);
    },
    startTest: (state) => {
      state.isOn = true;
    },
  },
});

export const { addCorrect, addIncorrect, startTest } = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
