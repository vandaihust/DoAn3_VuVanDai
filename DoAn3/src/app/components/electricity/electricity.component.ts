import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Electricity } from 'src/app/common/electricity';
import { ElectricityService } from 'src/app/services/electricity.service';

@Component({
  selector: 'app-electricity',
  templateUrl: './electricity.component.html',
  styleUrls: ['./electricity.component.css']
})
export class ElectricityComponent implements OnInit {
  electricity: Electricity[] = [];
  electricityShow: Electricity[] = [];
  countInt: number = 0;
  totalMoney: number = 0;
  tax: number = 0;
  totalMoneyAndTax: number = 0;
  constructor(private electricityService: ElectricityService,
              private formBuilder: FormBuilder,
    ) { }
  electricityFormGroup: FormGroup = this.formBuilder.group({
      electricityForm: this.formBuilder.group({
        count: new FormControl('',[Validators.required,

        ])
      })
    });
  ngOnInit(): void {
    this.showElectricityAll();
  }
  get count() { return this.electricityFormGroup.get('electricityForm.count')?.value; };
  showElectricityAll() {
    this.electricityService.getElectricityAll().subscribe(
      data => {
        this.electricity = data;
        console.log(data);
      }
    );
  }
  isNumber(n: string) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
  checkNumberForm(): boolean {
    let count: string = this.electricityFormGroup.get('electricityForm.count')?.value;
    if(this.isNumber(count)) {{
        if(parseInt(count) > 0) {
          this.countInt = parseInt(count);
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }
  computeElectricMoney(count: number, electricity: Electricity[]): number {
    let money: number = 0;
    let moneyBig: number = 0;
    let electricityShow: Electricity[] = new Array();
    if(count < 51){
      money = count * electricity[0].unitPrice; //bậc 1
      let electricityElement: Electricity = new Electricity(1, electricity[0].unitPrice, count, electricity[0].countCompare, money) ;
      electricityShow.push(electricityElement);
   }
   else if(count < 101){
    money = (count - 50) * electricity[1].unitPrice; //bậc 2
    let electricityElement: Electricity = new Electricity(2, electricity[1].unitPrice, count -50, electricity[1].countCompare, money) ;
    electricityShow.push(electricity[0]);
    electricityShow.push(electricityElement);
    console.log('tien bac 1 '+electricityShow[0].money);
    console.log('tien bac 2 '+electricityShow[1].money);
    console.log('tien bac 2 '+(electricityShow[1].money + electricityShow[0].money));
   }
   else if(count < 201){
    money = (count - 100) * electricity[2].unitPrice; //bậc 3
    let electricityElement: Electricity = new Electricity(3, electricity[2].unitPrice, count -100, electricity[2].countCompare, money) ;
    electricityShow.push(electricity[0]);
    electricityShow.push(electricity[1]);
    electricityShow.push(electricityElement);
    console.log('tien bac 3 '+(electricityShow[1].money + electricityShow[0].money +electricityShow[2].money));
   }
   else if(count < 301){
    money = (count - 200) * electricity[3].unitPrice; // bậc 4
    let electricityElement: Electricity = new Electricity(4, electricity[3].unitPrice, count -200, electricity[3].countCompare, money) ;
    electricityShow.push(electricity[0]);
    electricityShow.push(electricity[1]);
    electricityShow.push(electricity[2]);
    electricityShow.push(electricityElement);
    console.log('tien bac 4 '+(electricityShow[1].money + electricityShow[0].money +
                                electricityShow[2].money+  electricityShow[3].money));
   }
   else if(count < 401){
    money = (count - 300) * electricity[4].unitPrice; // bậc 5
    let electricityElement: Electricity = new Electricity(5, electricity[4].unitPrice, count -300, electricity[4].countCompare, money) ;
    electricityShow.push(electricity[0]);
    electricityShow.push(electricity[1]);
    electricityShow.push(electricity[2]);
    electricityShow.push(electricity[3]);
    electricityShow.push(electricityElement);
    console.log('tien bac 5 '+(electricityShow[1].money + electricityShow[0].money +
                                electricityShow[2].money+  electricityShow[3].money+electricityShow[4].money));
   }
   else{
    money =(count - 400) * electricity[5].unitPrice; // bậc 6
    let electricityElement: Electricity = new Electricity(6, electricity[5].unitPrice, count - 400, electricity[5].countCompare, money) ;
    electricityShow.push(electricity[0]);
    electricityShow.push(electricity[1]);
    electricityShow.push(electricity[2]);
    electricityShow.push(electricity[3]);
    electricityShow.push(electricity[4]);
    electricityShow.push(electricityElement);
    console.log('tien bac 6 '+(electricityShow[1].money + electricityShow[0].money +
                                electricityShow[2].money+  electricityShow[3].money+ electricityShow[4].money + electricityShow[5].money));
   }
   for (let i = 0; i < electricityShow.length ; i++) {
      moneyBig += electricityShow[i].money;
   }
   console.log("Tổng tiền là "+ moneyBig);
   this.electricityShow = electricityShow;
   let tax = Math.round(moneyBig * 0.1);
   this.tax = tax;
   this.totalMoneyAndTax = moneyBig + tax;
   return moneyBig;
  }
  numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
  onSubmit() {
    this.totalMoney = this.computeElectricMoney(this.countInt, this.electricity);
    console.log(this.electricity[3].unitPrice);
    console.log(this.electricityFormGroup.get('electricityForm.count')?.value);
  }
}
