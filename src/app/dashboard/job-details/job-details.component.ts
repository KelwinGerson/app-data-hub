import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent {
  displayedColumns: string[] = ['_id', 'nome_job', 'status', 'data_inicial', 'data_final', 'error_description'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
