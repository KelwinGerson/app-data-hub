import { Component, OnInit } from '@angular/core';
import { DataService, Log } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsComponent } from './job-details/job-details.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'nome_job', 'status', 'data_inicial','data_final','error_description'];

  logData: Log[] = [];

  constructor(
    private _dataService: DataService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this._dataService.getLogs().subscribe(data => {
      this.logData = data;
    })
  }

  countSuccess(): number {
    return this.logData.filter(log => log.status === 'success').length;
  }

  countFailed(): number {
    return this.logData.filter(log => log.status === 'failed').length;
  }

  openJobDetails(job: any) {
    this.dialog.open(JobDetailsComponent, {
      data: job
    })
  }

}
