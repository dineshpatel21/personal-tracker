"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { addIncome,removeIncome } from "../../redux/slices/IncomeReducer";
import {
  addCategoryItem,
  updateCategoryItem,
  removeCategory,
  removeItemFromExpense,
} from "../../redux/slices/ExpenseReducer";
import { toast } from "react-toastify";

export const financeContext = createContext({
  income: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
  deleteExpenseCategory: async () => {},
  deleteCategory: async () => {},
});

const FinanceContextProvider = ({ children }) => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const dispatch = useDispatch();
  const select = useSelector((state) => state);
  const incomeData = select.income;
  const expenseData = select.expense;

  let expenseCount = 0;

  const addIncomeItem = async (newIncome) => {
    dispatch(addIncome(newIncome));
    toast.success("income added");
  };

  const removeIncomeItem = async (id) => {
    dispatch(removeIncome({id}))
  };

  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    dispatch(updateCategoryItem({ expenseCategoryId, newExpense }));
  };

  const addCategory = async (category) => {
    const uid = uuidv4();
    dispatch(
      addCategoryItem({
        uid: uid,
        ...category,
        items: [],
      })
    );
  };

  const deleteExpenseCategory = async (updateExpanses, expenseCategoryId) => {
    dispatch(removeItemFromExpense({ updateExpanses, expenseCategoryId }));
  };

  const deleteCategory = async (expenseCategoryId) => {
    dispatch(removeCategory({ expenseCategoryId }));
  };

  const values = {
    income,
    expenses,
    addIncomeItem,
    removeIncomeItem,
    addExpenseItem,
    addCategory,
    deleteExpenseCategory,
    deleteCategory,
  };

  useEffect(() => {
    setIncome(incomeData.incomes);
    setExpenses(expenseData.expenses);
  }, [incomeData.incomes, expenseData.expenses]);

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
};

export default FinanceContextProvider;
