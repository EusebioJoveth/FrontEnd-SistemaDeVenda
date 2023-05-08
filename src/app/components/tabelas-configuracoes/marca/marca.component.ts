import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import { ModalMarcaComponent } from '../modals/modal-marca/modal-marca.component';
import { Marca } from 'src/app/Interfaces/marca';
import { MarcaService } from 'src/app/Services/marca.service';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';
import Swal from 'sweetalert2';

import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {

  itemsBreadCrumb: MenuItem[];
  home: MenuItem;

  colunasTabela: string[] = ['nome', 'descricao', 'estado', 'acoes'];
  dataMarca: Marca[] = [];
  dataListaMarca = new MatTableDataSource(this.dataMarca);
  @ViewChild(MatPaginator)paginacaoTabela!: MatPaginator;

  constructor(
    private dialog: MatDialog, private _marcaService: MarcaService,
    private _utilidadeService: UtilidadeService
  ) {
    this.itemsBreadCrumb = [
      {label: 'Páginas'},
      {label: 'Configurações'},
      {label: 'Marca'},
  ];

  this.home = {icon: 'pi pi-cog', routerLink: '/pages/configuracoes'};
   }

  obterMarcas(){
    this._marcaService.lista().subscribe({
      next:(data) =>{
        if(data.status) this.dataListaMarca.data = data.valor;
        else
        this._utilidadeService.mostrarAlerta("Não existem dados", "Ops!")
      },
      error:(err)=>{}
    })
  }

  ngOnInit(): void {
    this.obterMarcas();
  }

  ngAfterViewInit(): void {
    this.dataListaMarca.paginator = this.paginacaoTabela;
}

aplicarFiltroTabela(event: Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataListaMarca.filter = filterValue.trim().toLowerCase();
}

novaMarca(){
  this.dialog.open(ModalMarcaComponent, {
    disableClose:true
  }).afterClosed().subscribe(resultado => {
    if(resultado === "true") this.obterMarcas();
  });
}

editarMarca(marca:Marca){
  this.dialog.open(ModalMarcaComponent, {
    disableClose: true,
    data: marca
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "true") this.obterMarcas();
  });
}

eliminarMarca(marca:Marca){
  Swal.fire({
    title: "Deseja Eliminar Marca?",
    text: marca.nome,
    icon: "warning",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Sim, eliminar",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    cancelButtonText: "Não, cancelar"
  }).then((resultado) =>{
    if(resultado.isConfirmed){
      this._marcaService.eliminar(marca.idMarca).subscribe({
        next:(data) =>{
          if(data.status){
            this._utilidadeService.mostrarAlerta("Marca Eliminada", "Eliminada");
            this.obterMarcas();
          }else
            this._utilidadeService.mostrarAlerta("Não é possível elininar", "Erro!");
        },
        error: (err) => {}
      });
    }
  });
}

}
