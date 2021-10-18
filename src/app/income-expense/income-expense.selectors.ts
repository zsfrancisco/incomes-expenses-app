import {createSelector} from "@ngrx/store";
import {AppStateComplete} from "./income-expense.reducer";

export const selectIncomeExpense = (state: AppStateComplete) => state.incomesExpenses;
export const selectIncomeExpenseItems = createSelector(selectIncomeExpense, incomesExpenses => incomesExpenses.items);
