import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addCategoryItem: (state, action) => {
      state.expenses.push(action.payload);
    },

    removeCategory: (state, action) => {
      const { expenseCategoryId } = action.payload;
      state.expenses = state.expenses.filter(
        (category) => category.uid !== expenseCategoryId
      );
    },

    removeItemFromExpense: (state, action) => {
      const { updateExpanses, expenseCategoryId } = action.payload;

      const updateExp = [...state.expenses];
      const pos = updateExp.findIndex((ex) => ex.uid === expenseCategoryId);
      updateExp[pos].items = [...updateExpanses.items];
      updateExp[pos].total = updateExpanses.total;
      state.expenses = updateExp;
    },

    updateCategoryItem: (state, action) => {
      const { expenseCategoryId, newExpense } = action.payload;

      const foundIndex = state.expenses.findIndex(
        (expense) => expense.uid === expenseCategoryId
      );

      if (foundIndex !== -1) {
        state.expenses[foundIndex] = {
          ...state.expenses[foundIndex],
          ...newExpense,
        };
      } else {
        state.expenses.push({ id: expenseCategoryId, ...newExpense });
      }
      return state;
    },
  },
});

export const {
  addCategoryItem,
  updateCategoryItem,
  removeCategory,
  removeItemFromExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;
