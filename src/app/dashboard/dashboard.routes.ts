import {Routes} from "@angular/router";
import {StatisticsComponent} from "../income-expense/statistics/statistics.component";
import {IncomeExpenseComponent} from "../income-expense/income-expense.component";
import {DetailComponent} from "../income-expense/detail/detail.component";

export const dashboardRoutes: Routes = [
  {path: '', component: StatisticsComponent},
  {path: 'incomes-expenses', component: IncomeExpenseComponent},
  {path: 'details', component: DetailComponent},
]
