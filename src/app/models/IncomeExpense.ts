export class IncomeExpense {
  constructor(
    public description: string,
    public mount: number,
    public type: string,
    public uid?: string,
  ) {
  }
}
