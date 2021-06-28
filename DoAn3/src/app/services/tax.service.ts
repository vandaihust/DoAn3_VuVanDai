import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tax } from '../common/tax';
import { TaxComputeDegree } from '../common/tax-compute-degree';
import { TaxTable } from '../common/tax-table';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private taxUrl = "http://localhost:8080/api/tax"
  constructor(private httpClient: HttpClient) { }
  getTaxAll(): Observable<Tax[]> {
    return this.httpClient.get<Tax[]>(this.taxUrl);
  }
  getTaxTableAll(): Observable<TaxTable[]> {
    return this.httpClient.get<TaxTable[]>(`${this.taxUrl}/table`);
  }
  getTaxComputeDegreeAll(): Observable<TaxComputeDegree[]> {
    return this.httpClient.get<TaxComputeDegree[]>(`${this.taxUrl}/computedegree`);
  }
}
