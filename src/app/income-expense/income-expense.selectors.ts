import {AppState} from "../app.reducer";
import {createSelector} from "@ngrx/store";

export const selectIncomeExpense = (state: AppState) => state.incomesExpenses;
export const selectIncomeExpenseItems = createSelector(selectIncomeExpense, incomesExpenses => incomesExpenses.items);
