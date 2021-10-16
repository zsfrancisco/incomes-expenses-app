import {Pipe, PipeTransform} from '@angular/core';
import {IncomeExpense} from "../models/IncomeExpense";
import {IncomeExpenseEnums} from "../enums/income-expense.enums";

@Pipe({
  name: 'orderIncome'
})
export class OrderIncomePipe implements PipeTransform {

  transform(itemsToSort: IncomeExpense[]): IncomeExpense[] {
    const items = [...itemsToSort];
    return items.sort((a, b) =>
      a.type === IncomeExpenseEnums.INCOME ? -1 : 1);
  }

}
