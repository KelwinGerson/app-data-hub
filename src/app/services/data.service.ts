import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Log {
  _id: string;
  nome_job: string;
  status: string;
  data: string;
  error_description: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private readonly API_URL = 'http://localhost:3000/logs'

  constructor(private http: HttpClient) { }

  // OBSERVABLE PROVIDE SUPPORT FOR PASSING MESSAGES BETWEEN PARTS OF YOUR APP. ASYNC PROGRAMMING AND HANDLING MULTIPLE VALUES.
  getLogs(): Observable<any> {
    return this.http.get(this.API_URL)
  }
}
