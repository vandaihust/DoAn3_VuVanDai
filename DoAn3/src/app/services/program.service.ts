import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../common/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private programUrl = "http://localhost:8080/api/program";
  constructor(private httpClient: HttpClient) { }
  getProgramCategory(): Observable<Program[]> {
    return this.httpClient.get<Program[]>(this.programUrl);
  }
}
