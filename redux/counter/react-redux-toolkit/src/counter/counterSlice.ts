import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state: CounterState) => {
      state.value += 1;
    },
    decrement: (state: CounterState) => {
      state.value -= 1;
    },
  },
});

export default slice.reducer;

// Define a type for the state parameter
export const selectCount = (state: RootState): number => state.counter.value;
export const { increment, decrement } = slice.actions;
