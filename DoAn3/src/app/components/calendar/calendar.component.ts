import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CalendarLunar } from 'src/app/common/calendar-lunar';
import { CalendarSolar } from 'src/app/common/calendar-solar';
import { Can } from 'src/app/common/can';
import { Chi } from 'src/app/common/chi';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarLunar: CalendarLunar = new CalendarLunar;
  calendarSolar: CalendarSolar = new CalendarSolar;
  can: Can[] = [];
  chi: Chi[] = [];
  constructor(private calendarService: CalendarService,
              private formBuilder: FormBuilder,
              private router: Router,
    ) { }
    checkoutFormGroup: FormGroup = this.formBuilder.group({
      calendarSolar: this.formBuilder.group({
        dateSolar: new FormControl('', [Validators.required,
                                        Validators.minLength(8),]),
      }),
    });
  ngOnInit(): void {
      this.showCalendarLunar();
      this.showCalendarSolar();
      this.showCan();
      this.showChi();
  }
  get dateSolar() {return this.checkoutFormGroup.get('calendarSolar.dateSolar');}
  showCalendarLunar() {
    // let tempCalendarLunar: string = '';
    let tempCalendarLunar = new Array();
    let handleDate: string[] = this.handleDate();
    tempCalendarLunar = this.calendarService.computeCalendarLunar(parseInt(handleDate[1]),parseInt(handleDate[0]),parseInt(handleDate[2]));
    this.calendarLunar.day = tempCalendarLunar[0];
    this.calendarLunar.month = tempCalendarLunar[1];
    this.calendarLunar.year = tempCalendarLunar[2];
    this.calendarLunar.leapmonth = tempCalendarLunar[3];
    this.calendarLunar.yearChi = this.getYearChi(tempCalendarLunar[2]);
    this.calendarLunar.yearCan = this.getYearCan(tempCalendarLunar[2]);
    let jdDay: number = this.computeJuliusJdForDayCanChi(parseInt(handleDate[1]),parseInt(handleDate[0]),parseInt(handleDate[2]));
    this.calendarLunar.dayCan = this.getDayCan(jdDay);
    this.calendarLunar.dayChi = this.getDayChi(jdDay);
    this.calendarLunar.monthCan = this.getMonthCan(tempCalendarLunar[1], tempCalendarLunar[2]);
    this.calendarLunar.monthChi = this.getMonthChi(tempCalendarLunar[1]);

  }
  showCalendarSolar() {
    let handleDate: string[] = this.handleDate();
    this.calendarSolar.day = parseInt(handleDate[1]);
    this.calendarSolar.month = parseInt(handleDate[0]);
    this.calendarSolar.year = parseInt(handleDate[2]);
    console.log(this.calendarSolar.day);
  }
  handleDate(): string[] {
    let date = this.checkoutFormGroup.get('calendarSolar.dateSolar')?.value;
    let handleDate: string = date.toLocaleString().substring(0, 9);
    let handleDate2: string[] = handleDate.split("/");
    return handleDate2;
  }
  isNumber(value: unknown) {
    return Number.isNaN(value);
  }
  showCan() {
    this.calendarService.getCan().subscribe(
      data => {
        this.can = data;
      }
    );

  }
  showChi() {
    this.calendarService.getChi().subscribe(
      data => {
        this.chi = data;
      }
    );

}
  getYearChi(year: number): string {
    let chi: Chi[] = this.chi;
    let du = (year + 8) % 12;
    for (let i = 0; i< chi.length ; i++ ) {
      if ( chi[i].id == du) {
        console.log(chi[i].name);
        return chi[i].name;
      }
    };
    return '';
  }
  getYearCan(year: number): string {
    let can: Can[] = this.can;
    let du = (year + 6) % 10;
    for (let i = 0; i< can.length ; i++ ) {
      if ( can[i].id == du) {
        console.log(can[i].name);
        return can[i].name;
      }
    };
    return '';
  }
  computeJuliusJdForDayCanChi(dd: number, mm: number, yy: number): number {
    return this.calendarService.jdFromDate(dd, mm, yy);
  }
  getDayCan(jdDay: number): string {
    let can: Can[] = this.can;
    let du = (jdDay + 9) % 10;
    for (let i = 0; i< can.length ; i++ ) {
      if ( can[i].id == du) {
        console.log(can[i].name);
        return can[i].name;
      }
    };
    return '';
  }
  getDayChi(jdDay: number): string {
    let chi: Chi[] = this.chi;
    let du = (jdDay + 1) % 12;
    for (let i = 0; i< chi.length ; i++ ) {
      if ( chi[i].id == du) {
        console.log(chi[i].name);
        return chi[i].name;
      }
    };
    return '';
  }
  getMonthCan(M: number, Y: number): string {
    let can: Can[] = this.can;
    let du = (Y * 12 + M + 3) % 10;
    for (let i = 0; i< can.length ; i++ ) {
      if ( can[i].id == du) {
        console.log(can[i].name);
        return can[i].name;
      }
    };
    return '';
  }
  getMonthChi(M: number) {
    let chi: Chi[] = this.chi;
    let du = (M + 1) % 12;
    for (let i = 0; i< chi.length ; i++ ) {
      if ( chi[i].id == du) {
        console.log(chi[i].name);
        return chi[i].name;
      }
    };
    return '';
  }
  checkNamNhuan(year: number): boolean {
    let du: number[] = [0, 3, 6, 9, 11, 14, 17];
    let check: number = year % 19;
    if(du.includes(check)) return true;
    return false;
  }
  onSubmit() {
   console.log(this.handleDate());
   this.ngOnInit();
  }
}
