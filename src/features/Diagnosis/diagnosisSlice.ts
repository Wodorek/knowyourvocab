import { createSlice } from '@reduxjs/toolkit';

import { settings } from '../../common/settings';

export const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState: {
    totalFinished: 0,
    incorrectTotal: 0,
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
      state.incorrectTotal++;
      state.incorrectInARow++;
      if (state.incorrectInARow === settings.incorrectInARow) {
        state.isOn = false;
        state.isFinished = true;
      }
      if (state.incorrectTotal === settings.incorrectTotal) {
        state.isOn = false;
        state.isFinished = true;
      }
      if (state.totalFinished === settings.totalQuestions) {
        state.isOn = false;
      }
    },
    startTest: (state) => {
      state.isOn = true;
    },
    endTest: (state) => {
      state.isOn = false;
      state.isFinished = true;
    },
  },
});

export const {
  addCorrect,
  addIncorrect,
  startTest,
  endTest,
} = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
