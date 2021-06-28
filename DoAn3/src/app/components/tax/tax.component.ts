import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tax } from 'src/app/common/tax';
import { TaxTable } from 'src/app/common/tax-table';
import { TaxService } from 'src/app/services/tax.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {
  tax: Tax[] = [];
  taxTable: TaxTable[] = [];
  salaryInt: number = 0;
  constructor(private taxService: TaxService,
              private formBuilder: FormBuilder,
    ) { }
  taxFormGroup: FormGroup = this.formBuilder.group({
    taxForm: this.formBuilder.group({
      salary: new FormControl('',[Validators.required,

      ])
    })
  });
  ngOnInit(): void {
    this.showTaxAll();
    this.showTaxTableAll();
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
  numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  isNumber(n: string) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
  checkNumberForm(): boolean {
    let salary: string = this.taxFormGroup.get('taxForm.salary')?.value;
    if(this.isNumber(salary)) {{
        if(parseInt(salary) > 0) {
          this.salaryInt = parseInt(salary);
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }
}
