import { createSlice } from '@reduxjs/toolkit';

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    correctAnswers: {
      yellow: [] as string[],
      orange: [] as string[],
      green: [] as string[],
      blue: [] as string[],
    },
    incorrectAnswers: {
      yellow: [] as string[],
      orange: [] as string[],
      green: [] as string[],
      blue: [] as string[],
    },
  },
  reducers: {
    questionCorrect: (state, action) => {
      const arr: keyof typeof state.correctAnswers = action.payload.lvl;
      state.correctAnswers[arr].push(action.payload.question);
    },
    questionIncorrect: (state, action) => {
      const arr: keyof typeof state.correctAnswers = action.payload.lvl;
      state.incorrectAnswers[arr].push(action.payload.question);
    },
  },
});

export const { questionCorrect, questionIncorrect } = questionsSlice.actions;

export default questionsSlice.reducer;
