import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  itemsBreadCrumb: MenuItem[];
  home: MenuItem;

  constructor() {
    this.itemsBreadCrumb = [
      {label: 'Páginas'},
      {label: 'Dashboard'},
  ];
  this.home = {icon: 'pi pi-chart-bar', routerLink: '/pages/produtos'};
   }

  ngOnInit(): void {
  }

}
