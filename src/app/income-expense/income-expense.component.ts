import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncomeExpense} from "../models/IncomeExpense";
import {IncomeExpenseService} from "../services/income-expense.service";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {setLoading} from "../shared/ui.actions";
import {AppState} from "../app.reducer";

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styles: []
})
export class IncomeExpenseComponent {

  form: FormGroup;
  type = 'income';
  ui$ = this.store.select('ui');

  constructor(private formBuilder: FormBuilder,
              private incomeExpenseService: IncomeExpenseService,
              private readonly store: Store<AppState>) {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      mount: ['', Validators.required],
    });
  }

  onSubmit() {
    this.store.dispatch(setLoading({isLoading: true}));
    if (this.form.invalid) return;
    const {description, mount} = this.form.value;
    const incomeExpense = new IncomeExpense(description, mount, this.type);
    this.incomeExpenseService.createIncomeExpense(incomeExpense)
      .then(() => {
        this.form.reset();
        Swal.fire('Registro creado', description, 'success');
        this.store.dispatch(setLoading({isLoading: false}));
      })
      .catch(error => {
        Swal.fire('Error', error.message, 'error');
        this.store.dispatch(setLoading({isLoading: false}));
      });
  }
}
