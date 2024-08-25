import { configureStore } from "@reduxjs/toolkit";
import IncomeReducer from "./slices/IncomeReducer";
import ExpenseReducer from "./slices/ExpenseReducer";

const store = configureStore({
  reducer: {
    income: IncomeReducer,
    expense: ExpenseReducer,
  },
});
export default store;
