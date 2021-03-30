import { createSlice } from '@reduxjs/toolkit';

export const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState: {
    correct: 0,
    stage: 4,
    known: [] as string[],
    unknown: [] as string[],
  },
  reducers: {
    correctAnswer: (state) => {
      state.correct += 1;
    },
    advanceStage: (state) => {
      state.stage += 1;
    },
    addKnown: (state, action) => {
      state.known.push(action.payload);
    },
    addUnknown: (state, action) => {
      state.unknown.push(action.payload);
    },
  },
});

export const { correctAnswer, advanceStage } = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
