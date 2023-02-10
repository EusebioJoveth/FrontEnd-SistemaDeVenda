import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalCategoriaComponent } from '../modals/modal-categoria/modal-categoria.component';
import { Categoria } from 'src/app/Interfaces/categoria';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit, AfterViewInit {

  colunasTabela: string[] = ['nome', 'descricao', 'estado', 'acoes'];
  dataCategoria: Categoria[] = [];
  dataListaCategoria = new MatTableDataSource(this.dataCategoria);
  @ViewChild(MatPaginator)paginacaoTabela!: MatPaginator;

  constructor(
    private dialog: MatDialog, private _categoriaService: CategoriaService,
    private _utilidadeService: UtilidadeService

  ) {

  }

  obterCategorias(){
    this._categoriaService.lista().subscribe({
      next:(data) =>{
        if(data.status) this.dataListaCategoria.data = data.valor;
        else
        this._utilidadeService.mostrarAlerta("Não existem dados", "Ops!")
      },
      error:(err)=>{}
    })
  }

  ngOnInit(): void {
    this.obterCategorias();
  }

  ngAfterViewInit(): void {
      this.dataListaCategoria.paginator = this.paginacaoTabela;
  }

  aplicarFiltroTabela(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaCategoria.filter = filterValue.trim().toLowerCase();
  }

  novaCategoria(){
    this.dialog.open(ModalCategoriaComponent, {
      disableClose:true
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true") this.obterCategorias();
    });
  }

  editarCategoria(categoria:Categoria){
    this.dialog.open(ModalCategoriaComponent, {
      disableClose: true,
      data: categoria
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "true") this.obterCategorias();
    });
  }

  eliminarCategoria(categoria:Categoria){
    Swal.fire({
      title: "Deseja Eliminar Categoria?",
      text: categoria.nome,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Sim, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Não, cancelar"
    }).then((resultado) =>{
      if(resultado.isConfirmed){
        this._categoriaService.eliminar(categoria.idCategoria).subscribe({
          next:(data) =>{
            if(data.status){
              this._utilidadeService.mostrarAlerta("Categoria Eliminada", "Eliminada");
              this.obterCategorias();
            }else
              this._utilidadeService.mostrarAlerta("Não é possível elininar", "Erro!");
          },
          error: (err) => {}
        });
      }
    });
  }

}
