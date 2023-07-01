import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';

import {ModalDetailVendaComponent } from '../../modals/modal-detail-venda/modal-detail-venda.component';
import { Venda } from 'src/app/Interfaces/venda';
import { VendaService } from 'src/app/Services/venda.service';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';
import { MenuItem } from 'primeng/api';

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
  selector: 'app-historial-venda',
  templateUrl: './historial-venda.component.html',
  styleUrls: ['./historial-venda.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS}
  ]
})
export class HistorialVendaComponent implements OnInit, AfterViewInit {

  itemsBreadCrumb: MenuItem[];
  home: MenuItem;

  formPesquisa: FormGroup;
  opcoesPesquisa: any[] = [
    {value: 'data', descricao: 'Por datas'},
    {value: 'numero', descricao: 'Por número'}
  ];

  colunasTabela: string[] = ['dataRegisto', 'numeroDocumento', 'tipoPagamento', 'total', 'acoes'];
  dadoInicio: Venda[] = [];
  dadosListaVenda = new MatTableDataSource(this.dadoInicio);
  @ViewChild(MatPaginator) paginacaoTabela!: MatPaginator;

  constructor(
    private _formBuilder:FormBuilder, private dialog: MatDialog,
    private _vendaService: VendaService, private _utilidadeService: UtilidadeService
  ) {

    this.itemsBreadCrumb = [
      {label: 'Páginas'},
      {label: 'Historial de Vendas'},
  ];

  this.home = {icon: 'pi pi-shopping-bag', routerLink: '/pages/historial_venda'};

  this.formPesquisa = this._formBuilder.group({
    buscarPor: ['data'],
    numero: [''],
    dataInicio: [''],
    dataFim: ['']
  });

  this.formPesquisa.get('buscarPor')?.valueChanges.subscribe(value=>{
    this.formPesquisa.patchValue({
      numero: [''],
      dataInicio: '',
      dataFim: ''
    });
  });

   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.dadosListaVenda.paginator = this.paginacaoTabela;
  }

  aplicarFiltroTabela(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dadosListaVenda.filter = filterValue.trim().toLowerCase();
  }

  pesquisarVendas(){
    let _dataInicio:string = "";
    let _dataFim: string = "";
    console.log('DataInicio',this.formPesquisa.value.dataInicio, 'DataFim', this.formPesquisa.value.dataIFim )

    if(this.formPesquisa.value.buscarPor === 'data'){
      _dataInicio = moment(this.formPesquisa.value.dataInicio).format('DD/MM/YYYY');
      _dataFim = moment(this.formPesquisa.value.dataFim).format('DD/MM/YYYY');

      if(_dataInicio === 'Invalid date' || _dataFim === 'Invalid date'){
        this._utilidadeService.mostrarAlerta("Deve adicionar as datas ", "Alerta!");
        return;
      }
    }

    this._vendaService.historial(
      this.formPesquisa.value.buscarPor,
      this.formPesquisa.value.numero,
      _dataInicio,
      _dataFim
    ).subscribe({
      next: (data) =>{

        if(data.status)
        this.dadosListaVenda = data.valor;
        else
        this._utilidadeService.mostrarAlerta("Não existem dados", "Alerta!");
      },
      error: (err) => {console.log('Erro:', err);}
    });
  }

  verDetalheVenda(_venda: Venda){
    this.dialog.open(ModalDetailVendaComponent, {
      data: _venda,
      disableClose: true,
      width: '700px'
    });
  }

}
