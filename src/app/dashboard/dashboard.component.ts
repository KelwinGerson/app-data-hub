import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService, Log } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

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

  // Esta função é chamada quando o componente é inicializado
  ngOnInit(): void {

    // Chame a função getLogs() do serviço _dataService para obter os dados dos logs
    this._dataService.getLogs().subscribe(data => {
      // O subscribe() é usado para escutar as mudanças dos dados. Quando os dados são recebidos,
      // a função dentro do subscribe() é chamada com os dados como parâmetro.

      // Armazene os dados recebidos no array logData
      this.logData = data;

      // Crie um novo conjunto (Set) para obter nomes de jobs únicos
      // O Set é um objeto JavaScript que permite armazenar valores únicos: não permite valores duplicados
      // Em seguida, converta-o novamente para um array
      // Isso garante que o array jobNames contenha apenas nomes de jobs únicos
      this.jobNames = [...new Set(this.logData.map(item => item.nome_job))];

      // Inicialize o dataSource (que alimenta a tabela) com uma instância do MatTableDataSource contendo os dados do log
      // MatTableDataSource é uma classe do Material Angular que é usada para fornecer dados para a tabela
      this.dataSource = new MatTableDataSource(this.logData);

      // Atribua a instância do MatPaginator à propriedade paginator do dataSource
      // MatPaginator é um componente que fornece navegação para a tabela
      // Ao atribuir a instância do MatPaginator ao dataSource, a tabela será capaz de controlar sua paginação
      this.dataSource.paginator = this.paginator;
    });
  }


  // Conta o número de jobs com status 'success'
  countSuccess(): number {
    return this.dataSource ? this.dataSource.data.filter((log: Log) => log.status === 'success').length : 0;
  }

  // Conta o número de jobs com status 'failed'
  countFailed(): number {
    return this.dataSource ? this.dataSource.data.filter((log: Log) => log.status === 'failed').length : 0;
  }

  // Conta o número de jobs
  countTotal(): number {
    return this.dataSource ? this.dataSource.data.length: 0 ;
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
    this.dataSource = new MatTableDataSource(this.logData.filter(job => job.nome_job === filterValue));
    this.dataSource.paginator = this.paginator;
  }

  resetFilter() {
    // limpando o array dataSource
    this.dataSource = new MatTableDataSource(this.logData);
    this.dataSource.paginator = this.paginator;
  }
}
