import { createSlice } from '@reduxjs/toolkit';

const wordsInLvl = {
  yellow: 1300,
  orange: 1700,
  green: 3000,
  blue: 4000,
};
const questionsInLvl = {
  yellow: 30,
  orange: 25,
  green: 25,
  blue: 20,
};

export const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    percentages: {
      yellow: 0,
      orange: 0,
      green: 0,
      blue: 0,
    },
    totals: {
      yellow: 0,
      orange: 0,
      green: 0,
      blue: 0,
    },
  },
  reducers: {
    calculate: (state, action) => {
      const idx: keyof typeof state.percentages = action.payload.color;

      state.percentages[idx] =
        (action.payload.correct * 100) / questionsInLvl[idx];

      state.totals[idx] = (wordsInLvl[idx] * state.percentages[idx]) / 100;
    },
  },
});

export const { calculate } = answersSlice.actions;

export default answersSlice.reducer;
