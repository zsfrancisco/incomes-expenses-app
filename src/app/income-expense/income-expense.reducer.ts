import {IncomeExpense} from "../models/IncomeExpense";
import {Action, createReducer, on} from "@ngrx/store";
import {setItems} from "./income-expense.actions";
import {AppState} from "../app.reducer";

export interface State {
  items: IncomeExpense[];
}

export interface AppStateComplete extends AppState{
  incomesExpenses: State
}

export const initialState: State = {
  items: []
}

const _incomeExpenseReducer = createReducer(initialState,
  on(setItems, (state, {items}) => ({...state, items: [...items]}))
)

export function incomeExpenseReducer(state: State | undefined, action: Action) {
  return _incomeExpenseReducer(state, action);
}
