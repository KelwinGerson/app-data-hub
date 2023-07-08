import { Injectable } from '@angular/core';
import { of } from 'rxjs';

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

  
  mockData  = [
    {
      _id: '1',
      nome_job: 'Job 1',
      status: 'success',
      data: '2023-07-07T10:30:00',
      error_description: ''
    },
    {
      _id: '2',
      nome_job: 'Job 2',
      status: 'failed',
      data: '2023-07-07T11:00:00',
      error_description: 'Error message'
    },
    {
      _id: '3',
      nome_job: 'Job 3',
      status: 'failed',
      data: '2023-07-07T11:00:00',
      error_description: 'Error message'
    },
    {
      _id: '4',
      nome_job: 'Job 4',
      status: 'failed',
      data: '2023-07-07T11:00:00',
      error_description: 'Error message'
    },
    // adicione mais dados conforme necessário
  ];

  constructor() { }

  getLogData() {
    return of(this.mockData )
  }
}
