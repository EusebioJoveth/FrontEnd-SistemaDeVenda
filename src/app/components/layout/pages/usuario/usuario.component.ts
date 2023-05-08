import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUsuarioComponent } from '../../modals/modal-usuario/modal-usuario.component';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';
import Swal from 'sweetalert2';

import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit, AfterViewInit {

  itemsBreadCrumb: MenuItem[];
  home: MenuItem;

  colunasTabela:string[] = ['foto','nome', 'sobrenome', 'email', 'telefone', 'genero', 'rolDescricao', 'estado', 'acoes'];
  dataSource:Usuario[] = [];
  dataListaUsuarios = new MatTableDataSource(this.dataSource);
  @ViewChild(MatPaginator) paginacaoTabela!: MatPaginator

  constructor(
    private dialog: MatDialog, private _usuarioService: UsuarioService,
    private _utilidadeService: UtilidadeService

  ) {
    this.itemsBreadCrumb = [
      {label: 'Páginas'},
      {label: 'Usuários'},
  ];

  this.home = {icon: 'pi pi-user', routerLink: '/pages/usuarios'};
   }

  obterUsuarios(){
    this._usuarioService.lista().subscribe({
      next: (datauser)=>{
        if(datauser.status)
        this.dataListaUsuarios.data = datauser.valor;
        else
        this._utilidadeService.mostrarAlerta("Sem dados", "Ops!")
      },
      error: (e)=>{}
    });
  }

  ngOnInit(): void {
    this.obterUsuarios();
  }

  ngAfterViewInit(): void {
      this.dataListaUsuarios.paginator = this.paginacaoTabela;
  }

  aplicarFitroTabela(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter = filterValue.trim().toLowerCase();
  }

  novoUsuario(){
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "true")this.obterUsuarios();
    });
  }

  editarUsuario(usuario:Usuario){
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "true")this.obterUsuarios();
    });
  }

  eliminarUsuario(usuario:Usuario){
    Swal.fire({
      title: "Deseja Eliminar o Usuario?",
      text: `${usuario.nome} ${usuario.sobrenome}`,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Sim, Eliminar",
      showCancelButton:true,
      cancelButtonColor:'#d33',
      cancelButtonText: 'Cancelar'
    }).then((resultado)=>{
      if(resultado.isConfirmed){
        this.eliminar(usuario);
      }
    });
  }

  eliminar(usuario:Usuario){
    this._usuarioService.eliminar(usuario.idUsuario).subscribe({
      next: (userResponse) =>{
        if(userResponse.status){
          this._utilidadeService.mostrarAlerta("Usuario Eliminado", "Eliminado!")
          this.obterUsuarios();
        }else
        this._utilidadeService.mostrarAlerta("Não é possível eliminar usuario", "Erro");
      },
      error: (err)=>{}
    });
  }

}
