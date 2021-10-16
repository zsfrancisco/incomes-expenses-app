import {ActionReducerMap} from "@ngrx/store";
import * as ui from "./shared/ui.reducer";
import * as auth from "./auth/auth.reducer";
import * as incomesExpenses from "./income-expense/income-expense.reducer";


export interface AppState {
  ui: ui.State;
  auth: auth.State;
  incomesExpenses: incomesExpenses.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  incomesExpenses: incomesExpenses.incomeExpenseReducer
}
