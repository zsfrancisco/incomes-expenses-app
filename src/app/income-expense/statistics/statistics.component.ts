import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, of, Subscription} from "rxjs";
import {IncomeExpense} from "../../models/IncomeExpense";
import {selectIncomeExpenseItems} from "../income-expense.selectors";
import {IncomeExpenseEnums} from "../../enums/income-expense.enums";
import {AppStateComplete} from "../income-expense.reducer";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})
export class StatisticsComponent implements OnInit, OnDestroy {

  incomes = 0;
  expenses = 0;

  totalIncomes = 0;
  totalExpenses = 0;

  incomeExpense$: Observable<IncomeExpense[]> = of([]);
  incomeExpenseSubscription: Subscription;

  constructor(private store: Store<AppStateComplete>) {
  }

  ngOnInit(): void {
    this.getSelectors();
  }

  ngOnDestroy(): void {
    if (this.incomeExpenseSubscription) this.incomeExpenseSubscription.unsubscribe();
  }

  getSelectors(): void {
    this.incomeExpense$ = this.store.select(selectIncomeExpenseItems);
    this.incomeExpenseSubscription = this.incomeExpense$.subscribe(items => this.calculateStatistics(items));
  }

  calculateStatistics(items: IncomeExpense[]): void {
    this.incomes = 0;
    this.expenses = 0;
    this.totalIncomes = 0;
    this.totalExpenses = 0;

    for (const item of items) {
      if (item.type === IncomeExpenseEnums.INCOME) {
        this.totalIncomes += item.mount;
        this.incomes++;
      } else {
        this.totalExpenses += item.mount;
        this.expenses++;
      }
    }
  }

}
