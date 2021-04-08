import { createSlice } from '@reduxjs/toolkit';

export const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState: {
    totalFinished: 0,
    totalIncorrect: 0,
    incorrectInARow: 0,
    isOn: false,
    isFinished: false,
  },
  reducers: {
    addCorrect: (state) => {
      state.totalFinished++;
      state.incorrectInARow = 0;
    },
    addIncorrect: (state) => {
      state.totalFinished++;
      state.totalIncorrect++;
      state.incorrectInARow++;
      if (state.incorrectInARow === 10) {
        state.isOn = false;
        state.isFinished = true;
      }
      if (state.totalIncorrect === 30) {
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
