import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import { ModalImpostoComponent } from '../modals/modal-imposto/modal-imposto.component';
import { Imposto } from 'src/app/Interfaces/imposto';
import { ImpostoService } from 'src/app/Services/imposto.service';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';
import Swal from 'sweetalert2';

import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-imposto',
  templateUrl: './imposto.component.html',
  styleUrls: ['./imposto.component.scss']
})
export class ImpostoComponent implements OnInit {

  itemsBreadCrumb: MenuItem[];
  home: MenuItem;

  colunasTabela: string[] = ['nome', 'taxa', 'descricao', 'acoes'];
  dataImposto: Imposto[] = [];
  dataListaImposto = new MatTableDataSource(this.dataImposto);
  @ViewChild(MatPaginator)paginacaoTabela!: MatPaginator;

  constructor(
    private dialog: MatDialog, private _impostoService: ImpostoService,
    private _utilidadeService: UtilidadeService
  ) {
    this.itemsBreadCrumb = [
      {label: 'Páginas'},
      {label: 'Configurações'},
      {label: 'Imposto'},
  ];

  this.home = {icon: 'pi pi-cog', routerLink: '/pages/configuracoes'};
  }

  obterImpostos(){
    this._impostoService.lista().subscribe({
      next:(data) =>{
        if(data.status) this.dataListaImposto.data = data.valor;
        else
        this._utilidadeService.mostrarAlerta("Não existem dados", "Ops!")
      },
      error:(err)=>{}
    })
  }

  ngOnInit(): void {
    this.obterImpostos();
  }

  ngAfterViewInit(): void {
    this.dataListaImposto.paginator = this.paginacaoTabela;
}

aplicarFiltroTabela(event: Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataListaImposto.filter = filterValue.trim().toLowerCase();
}

novaImposto(){
  this.dialog.open(ModalImpostoComponent, {
    disableClose:true
  }).afterClosed().subscribe(resultado => {
    if(resultado === "true") this.obterImpostos();
  });
}

editarImposto(imposto:Imposto){
  this.dialog.open(ModalImpostoComponent, {
    disableClose: true,
    data: imposto
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "true") this.obterImpostos();
  });
}

eliminarImposto(imposto:Imposto){
  Swal.fire({
    title: "Deseja Eliminar Marca?",
    text: imposto.nome,
    icon: "warning",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Sim, eliminar",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    cancelButtonText: "Não, cancelar"
  }).then((resultado) =>{
    if(resultado.isConfirmed){
      this._impostoService.eliminar(imposto.idImposto).subscribe({
        next:(data) =>{
          if(data.status){
            this._utilidadeService.mostrarAlerta("Imposto Eliminada", "Eliminada");
            this.obterImpostos();
          }else
            this._utilidadeService.mostrarAlerta("Não é possível elininar", "Erro!");
        },
        error: (err) => {}
      });
    }
  });
}

}
