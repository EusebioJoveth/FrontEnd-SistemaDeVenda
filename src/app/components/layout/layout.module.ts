import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { VendaComponent } from './pages/venda/venda.component';
import { HistorialVendaComponent } from './pages/historial-venda/historial-venda.component';
import { SharedModule } from '../../Reutilizavel/shared/shared.module';
import { ProdutoComponent } from './pages/produto/produto.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ModalUsuarioComponent } from './modals/modal-usuario/modal-usuario.component';
import { ModalProdutoComponent } from './modals/modal-produto/modal-produto.component';
import { ModalDetailVendaComponent } from './modals/modal-detail-venda/modal-detail-venda.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsuarioComponent,
    VendaComponent,
    HistorialVendaComponent,
    ReporteComponent,
    ProdutoComponent,
    ModalUsuarioComponent,
    ModalProdutoComponent,
    ModalDetailVendaComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
