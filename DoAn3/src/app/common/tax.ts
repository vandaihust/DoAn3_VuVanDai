export class Tax {
  id: number = 0;
  salary: number = 0;
  tax: number = 0;
  money: number = 0;
  constructor(id: number, salary: number, tax: number, money: number) {
    this.id = id;
    this.salary = salary;
    this.tax = tax;
    this.money = money;
  }
}
