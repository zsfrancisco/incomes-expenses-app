import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {IncomeExpenseComponent} from "./income-expense.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {DetailComponent} from "./detail/detail.component";
import {OrderIncomePipe} from "../pipes/order-income.pipe";
import {DashboardRoutesModule} from "../dashboard/dashboard-routes.module";
import {StoreModule} from "@ngrx/store";
import {incomeExpenseReducer} from "./income-expense.reducer";

@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpenseComponent,
    StatisticsComponent,
    DetailComponent,
    OrderIncomePipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomesExpenses', incomeExpenseReducer),
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutesModule,
  ]
})
export class IncomeExpenseModule {
}
