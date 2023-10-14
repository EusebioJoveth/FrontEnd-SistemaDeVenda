import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import {Chart, registerables } from 'chart.js';
import { DashBoardService } from 'src/app/Services/dash-board.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  itemsBreadCrumb: MenuItem[];
  home: MenuItem;

  totalReceitas:string ='0';
  totalVendas:string = '0';
  totalProdutos:string = '0';

  constructor(private _dashboardService: DashBoardService) {
    this.itemsBreadCrumb = [
      {label: 'Páginas'},
      {label: 'Dashboard'},
      {label: 'Resumo última Semana', routerLink:"/pages/dashboard"}
  ];
  this.home = {icon: 'pi pi-chart-bar', routerLink: '/pages/dashboard'};
   }

  ngOnInit(): void {
    this._dashboardService.lista().subscribe({
      next: (data) =>{
        if(data.status){
          this.totalReceitas = data.valor.toatalRendas;
          this.totalVendas = data.valor.totalVendas;
          this.totalProdutos = data.valor.totalProdutos;

          const arrayData: any[] = data.valor.vendasUltimaSemana;
          const labelTemp = arrayData.map((value) => value.dataRegisto);
          const dataTemp = arrayData.map((value) => value.total);
          this.mostrarGrafico(labelTemp, dataTemp);
        }
      },
      error: (e) =>{}
    })
  }

  mostrarGrafico(labelGrafico:any[], dataGrafico:any[]){
    const chartBarras = new Chart('chartBarras', {
      type: 'bar',
      data: {
        labels: labelGrafico,
        datasets: [{
          label: 'Nº de Vendas',
          data: dataGrafico,
          backgroundColor: [
            '#b691ff'
          ],
          borderColor: ['#410f70'],
          borderWidth: 1
        }]
      },
      options:{
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y:{ beginAtZero: true}
        }
      }
    });
  }

}
