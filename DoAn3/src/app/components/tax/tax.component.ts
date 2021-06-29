import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tax } from 'src/app/common/tax';
import { TaxComputeDegree } from 'src/app/common/tax-compute-degree';
import { TaxTable } from 'src/app/common/tax-table';
import { TaxService } from 'src/app/services/tax.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {
  tax: Tax[] = [];
  taxShow: Tax[] = [];
  taxTable: TaxTable[] = [];
  taxComputeDegree: TaxComputeDegree[] = [];
  salaryInt: number = 0;
  peopleInt: number = 0;
  giamtrubanthan: number = 11000000;
  giamtrunguoiphuthuoc: number = 4400000;
  tiennguoiphuthuoc: number = 0;
  thunhapchiuthue: number = 0;
  totalTax: number = 0;
  constructor(private taxService: TaxService,
              private formBuilder: FormBuilder,
    ) { }
  taxFormGroup: FormGroup = this.formBuilder.group({
    taxForm: this.formBuilder.group({
      salary: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/) ]),
      people: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
    })
  });
  ngOnInit(): void {
    this.showTaxAll();
    this.showTaxTableAll();
    this.showTaxComputeDegreeAll();
  }
  showTaxAll() {
    this.taxService.getTaxAll().subscribe(
      data => {
        this.tax = data;
        console.log(data);
      }
    );
  }
  showTaxTableAll() {
    this.taxService.getTaxTableAll().subscribe(
      data => {
        this.taxTable = data;
        console.log(data);
      }
    );
  }
  showTaxComputeDegreeAll() {
    this.taxService.getTaxComputeDegreeAll().subscribe(
      data => {
        this.taxComputeDegree = data;
        console.log(data);
      }
    );
  }
  numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  isNumber(n: string) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
  get salary() { return this.taxFormGroup.get('taxForm.salary')}
  get people() { return this.taxFormGroup.get('taxForm.people')}

  computeTax(salary: number, people: number, tax: Tax[]) {
    if(salary < this.giamtrubanthan) {
      this.resetData();
    } else {
      let check: number = this.giamtrubanthan + (people * this.giamtrunguoiphuthuoc);
      this.tiennguoiphuthuoc = people * this.giamtrunguoiphuthuoc;
      console.log('tien ban than va phu thuoc'+check);
      if((salary-this.giamtrubanthan-people * this.giamtrunguoiphuthuoc) <= 0) {
        this.totalTax = 0;
        this.resetData();
        this.tiennguoiphuthuoc = people * this.giamtrunguoiphuthuoc;
        // console.log(this.totalTax);
      } else {
        let thunhapchiuthue = salary - this.giamtrubanthan - people * this.giamtrunguoiphuthuoc;
        this.thunhapchiuthue = thunhapchiuthue;

        console.log('thu nhap chiu thue '+ this.thunhapchiuthue);
        console.log('thu nhap chiu thue '+ thunhapchiuthue);
        this.computeTaxFull(thunhapchiuthue, tax);
      }
    }
  }
  computeTaxFull(thunhapchiuthue: number, tax: Tax[]) {
    let taxShow: Tax[] = new Array();
    let money: number = 0;
    let totalTax: number = 0;
    if (thunhapchiuthue <= tax[0].salary){
      money = Math.round(thunhapchiuthue * tax[0].tax/100); //bậc 1
      console.log(money);
      let taxElement: Tax = new Tax(1, thunhapchiuthue, tax[0].tax, money) ;
      taxShow.push(taxElement);
      console.log('tien bac 1 '+taxShow[0].money);
   }
   else if (thunhapchiuthue <= tax[1].salary){
    money = Math.round((thunhapchiuthue - tax[0].salary) * tax[1].tax/100); //bậc 2
    let taxElement: Tax = new Tax(2, thunhapchiuthue - tax[0].salary, tax[1].tax, money) ;
    taxShow.push(tax[0]);
    taxShow.push(taxElement);
    console.log('tien bac 1 '+taxShow[0].money);
    console.log('tien bac 2 '+taxShow[1].money);
    console.log('tien bac 2 '+(taxShow[1].money + taxShow[0].money));
   }
   else if (thunhapchiuthue <=  tax[2].salary){
    money = Math.round((thunhapchiuthue - tax[1].salary) * tax[2].tax/100); //bậc 2
    let taxElement: Tax = new Tax(3, thunhapchiuthue - tax[1].salary, tax[2].tax, money) ;
    taxShow.push(tax[0]);
    taxShow.push(tax[1]);
    taxShow.push(taxElement);
    console.log('tien bac 3 '+(taxShow[1].money + taxShow[0].money +taxShow[2].money));
   }
   else if (thunhapchiuthue <= tax[3].salary){
    money = Math.round((thunhapchiuthue - tax[2].salary) * tax[3].tax/100); // bậc 4
    let taxElement: Tax = new Tax(4, thunhapchiuthue - tax[2].salary, tax[3].tax, money) ;
    taxShow.push(tax[0]);
    taxShow.push(tax[1]);
    taxShow.push(tax[2]);
    taxShow.push(taxElement);
    console.log('tien bac 4 '+(taxShow[1].money + taxShow[0].money +
      taxShow[2].money+  taxShow[3].money));
   }
   else if (thunhapchiuthue <= tax[4].salary){
    money = Math.round((thunhapchiuthue - tax[3].salary) * tax[4].tax/100);// bậc 5
    let taxElement: Tax = new Tax(5, thunhapchiuthue - tax[3].salary, tax[4].tax, money) ;
    taxShow.push(tax[0]);
    taxShow.push(tax[1]);
    taxShow.push(tax[2]);
    taxShow.push(tax[3]);
    taxShow.push(taxElement);
    console.log('tien bac 5 '+(taxShow[1].money + taxShow[0].money +
      taxShow[2].money+  taxShow[3].money+taxShow[4].money));
   }
   else if (thunhapchiuthue <= tax[5].salary){
    money = Math.round((thunhapchiuthue - tax[4].salary) * tax[5].tax/100);// bậc 6
    let taxElement: Tax = new Tax(6, thunhapchiuthue - tax[4].salary, tax[5].tax, money) ;
    taxShow.push(tax[0]);
    taxShow.push(tax[1]);
    taxShow.push(tax[2]);
    taxShow.push(tax[3]);
    taxShow.push(tax[4]);
    taxShow.push(taxElement);
    console.log('tien bac 6 '+(taxShow[1].money + taxShow[0].money +
      taxShow[2].money+  taxShow[3].money+taxShow[4].money+ taxShow[5].money));
   }
   else {
    money = Math.round((thunhapchiuthue - tax[5].salary) * tax[6].tax/100); // bậc 7
    let taxElement: Tax = new Tax(7, thunhapchiuthue - tax[5].salary, tax[5].tax, money) ;
    taxShow.push(tax[0]);
    taxShow.push(tax[1]);
    taxShow.push(tax[2]);
    taxShow.push(tax[3]);
    taxShow.push(tax[4]);
    taxShow.push(tax[5]);
    taxShow.push(taxElement);
    console.log('tien bac 7 '+(taxShow[1].money + taxShow[0].money +
      taxShow[2].money+  taxShow[3].money+ taxShow[4].money + taxShow[5].money + taxShow[6].money));
   }
   for (let i = 0; i < taxShow.length ; i++) {
    totalTax += taxShow[i].money;
   }
   this.totalTax = totalTax;
   this.taxShow = taxShow;
  }
  parseIntSalaryAndPeople() {
    this.salaryInt = this.taxFormGroup.get("taxForm")?.value.salary;
    this.peopleInt = this.taxFormGroup.get("taxForm")?.value.people;

  }
  resetData() {
    this.taxShow = [];
    this.salaryInt  = 0;
    this.peopleInt = 0;
    this.giamtrubanthan = 11000000;
    this.giamtrunguoiphuthuoc = 4400000;
    this.tiennguoiphuthuoc = 0;
    this. thunhapchiuthue = 0;
    this.totalTax = 0;
  }
  onSubmit() {
    if (this.taxFormGroup.invalid) {
      this.taxFormGroup.markAllAsTouched();
    } else {
      console.log(this.taxFormGroup.get('taxForm')?.value.salary)
      console.log(this.taxFormGroup.get('taxForm')?.value.people)
      this.parseIntSalaryAndPeople();
      this.computeTax(this.salaryInt, this.peopleInt, this.tax);
      console.log(this.taxShow);
    }
  }
}
