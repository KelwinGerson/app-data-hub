import { Component, OnInit } from '@angular/core';
import { DataService, Log } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Colunas a serem exibidas na tabela
  displayedColumns: string[] = ['_id', 'nome_job', 'status', 'data_inicial', 'data_final', 'error_description'];

  // Array para armazenar os nomes dos jobs
  jobNames: string[] = [];

  // Array para armazenar os dados dos logs
  logData: Log[] = [];

  // Variável para armazenar os dados que serão exibidos na tabela
  dataSource: any;

  constructor(
    private _dataService: DataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Obtenha os dados dos logs e inicialize os arrays logData e jobNames
    this._dataService.getLogs().subscribe(data => {
      this.logData = data;
      // Crie um novo Set para obter nomes de jobs únicos e converta-o novamente para um array
      this.jobNames = [...new Set(this.logData.map(item => item.nome_job))]
      console.log(this.jobNames)
      // Inicialize o dataSource com uma cópia dos dados do log
      this.dataSource = [...this.logData]
    })
  }

  // Conta o número de jobs com status 'success'
  countSuccess(): number {
    return this.logData.filter(log => log.status === 'success').length;
  }

  // Conta o número de jobs com status 'failed'
  countFailed(): number {
    return this.logData.filter(log => log.status === 'failed').length;
  }

  // Abre o diálogo de detalhes do job
  openJobDetails(job: any) {
    this.dialog.open(JobDetailsComponent, {
      data: job
    })
  }

  // Aplica o filtro de job e atualiza o dataSource
  applyFilter(event: MatSelectChange) {
    const filterValue = event.value;
    console.log(filterValue)
    this.dataSource = this.logData.filter(job => job.nome_job === filterValue)
  }

  resetFilter() {
    // limpando o array dataSource
    this.dataSource = [...this.logData]
  }

  // Aplica o filtro de data (a ser implementado)
  applyDateFilter(event: MatDatepickerInputEvent<Date>) {
    const filterValue = event.value;
    // Aqui você aplica o filtro baseado na data. Você precisará implementar a lógica de como você quer que isso funcione.
    // Isso depende de como você está armazenando suas datas e pode envolver a conversão do objeto Date em uma string ou timestamp, por exemplo.
  }
}
