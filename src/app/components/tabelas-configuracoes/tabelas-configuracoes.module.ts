import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabelasConfiguracoesRoutingModule } from './tabelas-configuracoes-routing.module';
import { TabelasConfiguracoesComponent } from './tabelas-configuracoes.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { MarcaComponent } from './marca/marca.component';
import { ImpostoComponent } from './imposto/imposto.component';
import { SharedModule } from 'src/app/Reutilizavel/shared/shared.module';
import { ModalCategoriaComponent } from './modals/modal-categoria/modal-categoria.component';
import { ModalMarcaComponent } from './modals/modal-marca/modal-marca.component';
import { ModalImpostoComponent } from './modals/modal-imposto/modal-imposto.component';


@NgModule({
  declarations: [
    TabelasConfiguracoesComponent,
    CategoriaComponent,
    MarcaComponent,
    ImpostoComponent,
    ModalCategoriaComponent,
    ModalMarcaComponent,
    ModalImpostoComponent,
  ],
  imports: [
    CommonModule,
    TabelasConfiguracoesRoutingModule,
    SharedModule
  ]
})
export class TabelasConfiguracoesModule { }
