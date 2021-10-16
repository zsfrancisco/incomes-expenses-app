import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {selectIncomeExpenseItems} from "../income-expense.selectors";
import {Observable, of} from "rxjs";
import {IncomeExpenseService} from "../../services/income-expense.service";
import {IncomeExpense} from "../../models/IncomeExpense";
import Swal from "sweetalert2";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit {

  incomeExpense$: Observable<IncomeExpense[] | null> = of([]);

  constructor(private store: Store<AppState>, private incomeExpenseService: IncomeExpenseService) {
  }

  ngOnInit(): void {
    this.getSelectors();
  }

  getSelectors(): void {
    this.incomeExpense$ = this.store.select(selectIncomeExpenseItems);
  }

  async onDeleteIncomeExpenseItem(uidIncomeExpenseItem: string | undefined): Promise<void> {
    try {
      await this.incomeExpenseService.deleteIncomeExpense(uidIncomeExpenseItem);
      Swal.fire('Deleted', 'The item has been deleted successfully', 'success');
    } catch (error) {
      Swal.fire('Deleted', error.message, 'error');
    }
  }
}
