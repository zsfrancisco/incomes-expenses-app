import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectUser} from "../auth/auth.selectors";
import {AppState} from "../app.reducer";
import * as incomeExpenseActions from "../income-expense/income-expense.actions";
import {filter} from "rxjs/operators";
import {Subscription} from "rxjs";
import {IncomeExpenseService} from "../services/income-expense.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  incomeExpenseSubscription: Subscription;

  constructor(private store: Store<AppState>, private incomeExpenseService: IncomeExpenseService) {
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select(selectUser)
      .pipe(
        filter(auth => auth != null)
      )
      .subscribe(user => {
        this.incomeExpenseSubscription = this.incomeExpenseService.initIncomeExpenseListener(user?.uid)
          .subscribe(incomeExpenseFirebase =>
            this.store.dispatch(incomeExpenseActions.setItems({items: incomeExpenseFirebase})))
      });
  }

  ngOnDestroy() {
    this.incomeExpenseSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
