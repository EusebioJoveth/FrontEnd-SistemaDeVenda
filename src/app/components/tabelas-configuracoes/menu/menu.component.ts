import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MenuItem } from 'primeng/api';
import { Menu } from 'src/app/Interfaces/menu';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';
import { MenuService } from 'src/app/Services/menu.service';
import { ModalMenuComponent } from '../modals/modal-menu/modal-menu.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  itemsBreadCrumb: MenuItem[];
  home: MenuItem;

  colunasTabela: string[] = ['icone', 'nome', 'url', 'acoes'];
  dataMenu: Menu[] = [];
  dataListaMenu= new MatTableDataSource(this.dataMenu);
  @ViewChild(MatPaginator)paginacaoTabela!: MatPaginator;

  constructor(
    private dialog: MatDialog, private _menuServico: MenuService,
    private _utilidadeService: UtilidadeService

  ) {
    this.itemsBreadCrumb = [
      {label: 'Páginas'},
      {label: 'Configurações'},
      {label: 'Menus'},
  ];

  this.home = {icon: 'pi pi-cog', routerLink: '/pages/configuracoes'};
  }

  obterMenus(){
    this._menuServico.menus().subscribe({
      next:(data) =>{
        if(data.status) this.dataListaMenu.data = data.valor;
        else
        this._utilidadeService.mostrarAlerta("Não existem dados", "Ops!")
      },
      error:(err)=>{}
    })
  }

  ngOnInit(): void {
    this.obterMenus();
  }

  ngAfterViewInit(): void {
      this.dataListaMenu.paginator = this.paginacaoTabela;
  }

  aplicarFiltroTabela(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaMenu.filter = filterValue.trim().toLowerCase();
  }

  novoMenu(){
    this.dialog.open(ModalMenuComponent, {
      disableClose:true
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true") this.obterMenus();
    });
  }

  editarMenu(menu:Menu){
    this.dialog.open(ModalMenuComponent, {
      disableClose: true,
      data: menu
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "true") this.obterMenus();
    });
  }

  eliminarMenu(menu:Menu){
    Swal.fire({
      title: "Deseja Eliminar o Menu?",
      text: menu.nome,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Sim, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Não, cancelar"
    }).then((resultado) =>{
      if(resultado.isConfirmed){
        this._menuServico.eliminar(menu.idMenu).subscribe({
          next:(data) =>{
            if(data.status){
              this._utilidadeService.mostrarAlerta("Menu Eliminado", "Eliminado");
              this.obterMenus();
            }else
              this._utilidadeService.mostrarAlerta("Não é possível elininar", "Erro!");
          },
          error: (err) => {}
        });
      }
    });
  }

}
