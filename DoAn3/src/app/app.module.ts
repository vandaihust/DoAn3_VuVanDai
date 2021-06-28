import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgramComponent } from './components/program/program.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { ElectricityComponent } from './components/electricity/electricity.component';
import { TaxComponent } from './components/tax/tax.component';
const routes: Routes = [
  {path: 'program/1', component: CalendarComponent},
  {path: 'program', component: ProgramComponent},
  {path: 'program/2', component: ElectricityComponent},
  {path: 'program/3', component: TaxComponent},
  {path: '', redirectTo: '/program/1', pathMatch: 'full'},
  {path: '**', redirectTo: '/program/1', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ProgramComponent,
    ElectricityComponent,
    TaxComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
