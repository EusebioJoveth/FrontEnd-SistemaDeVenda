import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';

import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import { ModalProdutoComponent } from '../../modals/modal-produto/modal-produto.component';
import { Produto } from 'src/app/Interfaces/produto';
import { ProdutoService } from 'src/app/Services/produto.service';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';
import Swal from 'sweetalert2';

import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit, AfterViewInit {

  itemsBreadCrumb: MenuItem[];
  home: MenuItem;

  colunasTabela:string[] = ['codigo','nome', 'categoria', 'marca', 'imposto', 'stock', 'preco', 'estado', 'foto', 'acoes'];
  dataSource:Produto[] = [];
  dataListaProdutos = new MatTableDataSource(this.dataSource);
  @ViewChild(MatPaginator) paginacaoTabela!: MatPaginator

  constructor(
    private dialog: MatDialog, private _produtoService: ProdutoService,
    private _utilidadeService: UtilidadeService
  ) {
    this.itemsBreadCrumb = [
      {label: 'Páginas'},
      {label: 'Produtos'},
  ];

  this.home = {icon: 'pi pi-shopping-bag', routerLink: '/pages/produtos'};
  }

  obterProdutos(){
    this._produtoService.lista().subscribe({
      next: (data) =>{
        if(data.status)
        this.dataListaProdutos.data = data.valor;
        else
        this._utilidadeService.mostrarAlerta("Não existe dados na Base de dados", "Ops!")
      },
      error: (e) => {}
    });
  }

  ngOnInit(): void {

    this.obterProdutos();
  }

  ngAfterViewInit(): void {
      this.dataListaProdutos.paginator = this.paginacaoTabela;
  }

  aplicarFitroTabela(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProdutos.filter = filterValue.trim().toLowerCase();
  }

  novoProduto(){
    this.dialog.open(ModalProdutoComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "true")this.obterProdutos();
    });
  }

  editarProduto(produto:Produto){
    this.dialog.open(ModalProdutoComponent, {
      disableClose: true,
      data: produto
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "true")this.obterProdutos();
    });
  }

  eliminarProduto(produto:Produto){
    Swal.fire({
      title: "Deseja Eliminar o Produto?",
      text: `${produto.nome}`,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Sim, Eliminar",
      showCancelButton:true,
      cancelButtonColor:'#d33',
      cancelButtonText: 'Cancelar'
    }).then((resultado)=>{
      if(resultado.isConfirmed){
        this.eliminar(produto);
      }
    });
  }

  eliminar(produto:Produto){
    this._produtoService.eliminar(produto.idProduto).subscribe({
      next: (produtoResponse) =>{
        if(produtoResponse.status){
          this._utilidadeService.mostrarAlerta("Produto Eliminado", "Eliminado!")
          this.obterProdutos();
        }else
        this._utilidadeService.mostrarAlerta("Não é possível eliminar o Produto", "Erro");
      },
      error: (err)=>{}
    });
  }


}
