import { Component, OnInit } from '@angular/core';
import { DataService, Log } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'nome_job', 'status', 'data', 'error_description'];

  logData: Log[] = [];

  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    this._dataService.getLogData().subscribe(data => {
      this.logData = data;
    })
  }

  countSuccess(): number {
    return this.logData.filter(log => log.status === 'success').length;
  }

  countFailed(): number {
    return this.logData.filter(log => log.status === 'failed').length;
  }


}
