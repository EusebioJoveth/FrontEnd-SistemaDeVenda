import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/Interfaces/menu';

import { MenuService } from 'src/app/Services/menu.service';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { NavegacaoService } from 'src/app/Services/navegacao.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  listaMenus: Menu[] =[];
  emailUser:string = "";
  rolUser:string = "";

  userDados:any = {};
  imgDefault = "assets/images/user.png";
  constructor( private router: Router, private _menuService: MenuService,
    private _utilidadeService: UtilidadeService, private _navegacao:NavegacaoService) { }

  ngOnInit(): void {
    const user = this._utilidadeService.obterSessaoUsuario();

    if(user != null){
      this.emailUser = user.email;
      this.rolUser = user.rolDescricao;

      this._menuService.lista(user.idUsuario).subscribe({
        next: (data) =>{
          if(data.status) this.listaMenus = data.valor;
        },
        error:(e) =>{}
      })
    }
  }

  navigateToPage(menu:any){
   this._navegacao.navigatePages(menu);
  }

  logout(){
    this._utilidadeService.eliminarSessaoUsuario();
    this.router.navigate(["login"]);
  }

  openProfileDialog(){

  }

}
