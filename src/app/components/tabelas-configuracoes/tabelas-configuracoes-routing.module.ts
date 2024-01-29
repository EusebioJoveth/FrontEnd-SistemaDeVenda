import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { ImpostoComponent } from './imposto/imposto.component';
import { MarcaComponent } from './marca/marca.component';
import { TabelasConfiguracoesComponent } from './tabelas-configuracoes.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: "", component: TabelasConfiguracoesComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'imposto', component: ImpostoComponent},
  {path: 'marca', component: MarcaComponent},
  {path: 'menus', component: MenuComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabelasConfiguracoesRoutingModule { }
