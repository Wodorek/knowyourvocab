import { createSlice } from '@reduxjs/toolkit';

export const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState: {
    totalFinished: 0,
    incorrectInARow: 0,
    correct: [] as string[],
    incorrect: [] as string[],
    isOn: false,
    isFinished: false,
  },
  reducers: {
    addCorrect: (state, action) => {
      state.correct.push(action.payload);
      state.totalFinished++;
      state.incorrectInARow = 0;
    },
    addIncorrect: (state, action) => {
      state.incorrect.push(action.payload);
      state.totalFinished++;
      state.incorrectInARow++;
      if (state.incorrectInARow === 10) {
        state.isOn = false;
        state.isFinished = true;
      }
      if (state.incorrect.length === 30) {
        state.isOn = false;
        state.isFinished = true;
      }
    },
    startTest: (state) => {
      state.isOn = true;
    },
  },
});

export const { addCorrect, addIncorrect, startTest } = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
