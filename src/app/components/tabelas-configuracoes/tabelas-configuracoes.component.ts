import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-tabelas-configuracoes',
  templateUrl: './tabelas-configuracoes.component.html',
  styleUrls: ['./tabelas-configuracoes.component.scss']
})
export class TabelasConfiguracoesComponent implements OnInit {

  itemsBreadCrumb: MenuItem[];
  home: MenuItem;

  constructor() {
    this.itemsBreadCrumb = [
      {label: 'Páginas'},
      {label: 'Configurações'},
  ];

  this.home = {icon: 'pi pi-cog', routerLink: '/pages/configuracoes'};
  }

  ngOnInit(): void {

  }

}
