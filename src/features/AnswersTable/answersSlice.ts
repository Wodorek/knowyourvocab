import { createSlice } from '@reduxjs/toolkit';
import { blueLvl } from '../../common/Lvls/blueLvl';
import { greenLvl } from '../../common/Lvls/greenLvl';
import { yellowLvl } from '../../common/Lvls/yellowLvl';
import { orangeLvl } from '../../common/Lvls/orangeLvl';

const wordsInLvl = {
  yellow: 1300,
  orange: 1700,
  green: 3000,
  blue: 4000,
};

const questionsInLvl = {
  yellow: yellowLvl.length,
  orange: orangeLvl.length,
  green: greenLvl.length,
  blue: blueLvl.length,
};

export const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    answers: {
      yellow: 0,
      orange: 0,
      green: 0,
      blue: 0,
    },
    percentage: {
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
      total: 0,
    },
  },
  reducers: {
    calculate: (state, action) => {
      const idx: keyof typeof state.percentage = action.payload;

      state.percentage[idx] = (state.answers[idx] / questionsInLvl[idx]) * 100;

      state.totals[idx] = (wordsInLvl[idx] * state.percentage[idx]) / 100;
      let total = 0;

      Object.keys(state.totals).forEach((key) => {
        if (key === 'total') {
          return;
        }
        const idx = key as keyof typeof state.totals;

        total += state.totals[idx];
      });

      state.totals.total = total;
    },
    setInitialValues: (state, action) => {
      state.answers = action.payload;

      //not very DRY, but dispatching and action within a reducer is a bad thing to do
      Object.keys(action.payload).forEach((key: any) => {
        const idx: keyof typeof state.percentage = key;

        state.percentage[idx] =
          (state.answers[idx] / questionsInLvl[idx]) * 100;

        state.totals[idx] = (wordsInLvl[idx] * state.percentage[idx]) / 100;
        state.totals.total += (wordsInLvl[idx] * state.percentage[idx]) / 100;
      });
    },
    changeToCorrect: (state, action) => {
      const idx: keyof typeof state.answers = action.payload;
      state.answers[idx]++;
    },
    changeToIncorrect: (state, action) => {
      const idx: keyof typeof state.answers = action.payload;
      state.answers[idx]--;
    },
  },
});

export const {
  calculate,
  setInitialValues,
  changeToCorrect,
  changeToIncorrect,
} = answersSlice.actions;

export default answersSlice.reducer;
