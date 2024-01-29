import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';
import { NavegacaoService } from 'src/app/Services/navegacao.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-tabelas-configuracoes',
  templateUrl: './tabelas-configuracoes.component.html',
  styleUrls: ['./tabelas-configuracoes.component.scss']
})
export class TabelasConfiguracoesComponent implements OnInit {

  itemsBreadCrumb: MenuItem[];
  home: MenuItem;
  usuarioLogado:any;

  constructor(private _usuarioServico:UsuarioService, private _navigateService:NavegacaoService) {
    this.itemsBreadCrumb = [
      {label: 'Páginas'},
      {label: 'Configurações'},
  ];

  this.home = {icon: 'pi pi-cog', routerLink: '/pages/configuracoes'};
  }

  ngOnInit(): void {
    this.usuarioLogado = this._usuarioServico.obterDadosDoUserLogado();
  }

  navigateToMenu(rotaName:string){
    this._navigateService.navigatePages(`/pages/configuracoes/${rotaName}`);
  }

}
