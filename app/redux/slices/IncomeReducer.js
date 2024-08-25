import { createSlice } from "@reduxjs/toolkit";

const initialState = { incomes: [] };

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addIncome: (state, action) => {
      state.incomes.push(action.payload);
    },
    removeIncome: (state, action) => {
      const { id } = action.payload;
      state.incomes = state.incomes.filter((category) => category.uid !== id);
    },
  },
});

export const { addIncome, removeIncome } = incomeSlice.actions;

export default incomeSlice.reducer;
