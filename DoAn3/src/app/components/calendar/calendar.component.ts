import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarLunar } from 'src/app/common/calendar-lunar';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarLunar: CalendarLunar = new CalendarLunar;
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
      // this.checkoutFormGroup = this.formBuilder.group({
      //   calendarSolar: this.formBuilder.group({
      //     dateSolar: new FormControl('', [Validators.required,
      //                                     Validators.minLength(8),]),
      //   }),
      // });
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
    this.calendarLunar.id = tempCalendarLunar[3];
    console.log(this.calendarLunar.day);
  }
  handleDate(): string[] {
    let date = this.checkoutFormGroup.get('calendarSolar.dateSolar')?.value;
    let handleDate: string = date.toLocaleString().substring(0, 9);
    let handleDate2: string[] = handleDate.split("/");
    return handleDate2;
  }
  onSubmit() {
   console.log(this.handleDate());
   this.showCalendarLunar();
  }
}
