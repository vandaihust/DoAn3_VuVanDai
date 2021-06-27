export class Electricity {
  id: number = 0;
  unitPrice: number = 0;
  count: number = 0;
  countCompare: number = 0;
  money: number = 0;
  constructor(id: number, unitPrice: number, count: number, countCompare: number, money: number) {
    this.id = id;
    this.unitPrice = unitPrice;
    this.countCompare = countCompare;
    this.count = count;
    this.money = money;
  }
}
