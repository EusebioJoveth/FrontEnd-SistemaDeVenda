import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MenuItem } from 'primeng/api';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';

import * as XLSX from 'xlsx';
import { Reporte } from 'src/app/Interfaces/reporte';
import { Venda } from 'src/app/Interfaces/venda';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';
import { VendaService } from 'src/app/Services/venda.service';

export const MY_DATA_FORMATS ={
  parse:{
    dateInput: 'DD/MM/YYYY'
  },
  display:{
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS}
  ]
})
export class ReporteComponent implements OnInit {

  itemsBreadCrumb: MenuItem[];
  home: MenuItem;

  formularioFiltro: FormGroup;
  listaVendaReporte: Reporte[] = [];
  colunasTabela:string[] = ["dataRegisto", "numeroVenda", "tipoPagamento",
                             "total", "produto", "quantidade", "preco", "totalProduto"];
  dadosVendaReporte = new MatTableDataSource(this.listaVendaReporte);
  @ViewChild(MatPaginator) paginacaoTabela!: MatPaginator;

  constructor(private _formBuilder:FormBuilder, private _vendaService: VendaService,
    private _utilidadeService: UtilidadeService ) {

    this.itemsBreadCrumb = [
      {label: 'Páginas'},
      {label: 'Relatórios'},
  ];
  this.home = {icon: 'pi pi-file-pdf', routerLink: '/pages/produtos'};

  this.formularioFiltro = this._formBuilder.group({
    dataInicio: ['', Validators.required],
    dataFim: ['', Validators.required]
  });
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dadosVendaReporte.paginator = this.paginacaoTabela;
}

pesquisarVendas(){
  const _dataInicio = moment(this.formularioFiltro.value.dataInicio).format('DD/MM/YYYY');
  const _dataFim = moment(this.formularioFiltro.value.dataFim).format('DD/MM/YYYY');

  if(_dataInicio === 'Invalid date' || _dataFim === 'Invalid date'){
    this._utilidadeService.mostrarAlerta("Deve adicionar as datas ", "Alerta!");
    return;
  }

  this._vendaService.reporte(_dataInicio, _dataFim).subscribe({
    next: (data)=>{
      if(data.status){
        this.listaVendaReporte = data.valor;
        this.dadosVendaReporte.data = data.valor;
      }else{
        this.listaVendaReporte = [];
        this.dadosVendaReporte.data = [];
        this._utilidadeService.mostrarAlerta("Sem Dados!", "Nao foi possível localizar os dados");
      }
    },
    error:(e) =>{}
  })
}

exportarDadosParaExcel(){
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(this.listaVendaReporte);

XLSX.utils.book_append_sheet(wb,ws, "Relatorio");
XLSX.writeFile(wb, "Relatório Vendas.xlsx");
}

}
