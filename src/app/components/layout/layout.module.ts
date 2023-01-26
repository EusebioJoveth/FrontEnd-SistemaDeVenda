import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { ImpostoComponent } from './pages/imposto/imposto.component';
import { VendaComponent } from './pages/venda/venda.component';
import { HistorialVendaComponent } from './pages/historial-venda/historial-venda.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { SharedModule } from '../../Reutilizavel/shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    UsuarioComponent,
    CategoriaComponent,
    MarcaComponent,
    ImpostoComponent,
    VendaComponent,
    HistorialVendaComponent,
    ReporteComponent,
    ProdutoComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
