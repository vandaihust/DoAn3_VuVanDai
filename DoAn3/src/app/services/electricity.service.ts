import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Electricity } from '../common/electricity';

@Injectable({
  providedIn: 'root'
})
export class ElectricityService {
  private electricityUrl = "http://localhost:8080/api/electricity";
  constructor(private httpClient: HttpClient) { }
  getElectricityAll(): Observable<Electricity[]> {
    return this.httpClient.get<Electricity[]>(this.electricityUrl);
  }
}
