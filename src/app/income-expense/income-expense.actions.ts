import {createAction, props} from "@ngrx/store";
import {IncomeExpense} from "../models/IncomeExpense";

export const setItems = createAction(
  '[IncomeExpense] Set Items',
  props<{ items: IncomeExpense[] }>()
);
