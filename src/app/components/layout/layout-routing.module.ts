import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HistorialVendaComponent } from './pages/historial-venda/historial-venda.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { VendaComponent } from './pages/venda/venda.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'usuarios', component: UsuarioComponent},
      {path: 'produtos', component: ProdutoComponent},
      {path: 'vendas', component: VendaComponent},
      {path: 'historial_venda', component: HistorialVendaComponent},
      {path: 'reportes', component: ReporteComponent},
      {path: "configuracoes", loadChildren: () => import("./../tabelas-configuracoes/tabelas-configuracoes.module").then(m=>m.TabelasConfiguracoesModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
