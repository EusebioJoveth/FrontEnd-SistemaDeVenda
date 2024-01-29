import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/app/Interfaces/menu';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-modal-menu',
  templateUrl: './modal-menu.component.html',
  styleUrls: ['./modal-menu.component.scss']
})
export class ModalMenuComponent {

  formularioMenu: FormGroup;
  tituloAcao: string = "Adicionar";
  botaoAcao: string = "Gravar";

  constructor(
    private modalActual: MatDialogRef<ModalMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public dadosMenu: Menu,
    private _formBuilder: FormBuilder, private _menuServico: MenuService,
    private _utilidadeService: UtilidadeService
  ) {
    this.formularioMenu = this._formBuilder.group({
      nome: ['', Validators.required],
      icone:['',Validators.required],
      url:['',Validators.required]
    });

    if(this.dadosMenu !=null){
      this.tituloAcao = "Editar";
      this.botaoAcao = "Actualizar";
    }
  }

  ngOnInit(): void {
    if(this.dadosMenu != null){
      this.formularioMenu.patchValue({
        nome: this.dadosMenu.nome,
        icone: this.dadosMenu.icone,
        url: this.dadosMenu.url
      });
    }
  }

  gravarOuEditarMenu(){
    const _menu: Menu = {
      idMenu: this.dadosMenu == null ? 0 : this.dadosMenu.idMenu,
      nome: this.formularioMenu.value.nome,
      icone: this.formularioMenu.value.icone,
      url: this.formularioMenu.value.url
    }

    if(this.dadosMenu == null)
       this.criar(_menu);
    else
       this.editar(_menu);
  }


  criar(menu:Menu){
    this._menuServico.criar(menu).subscribe({
      next:(dado) =>{
        if(dado.status){
          this._utilidadeService.mostrarAlerta("Menu Registado com Sucesso", "Exito");
          this.modalActual.close("true")
        }else
        this._utilidadeService.mostrarAlerta("Não é possível Registar o Menu", "Erro");
      },
      error: (err) => {}
    });
  }

  editar(menu:Menu){
    this._menuServico.editar(menu).subscribe({
      next:(dado) =>{
        if(dado.status){
          this._utilidadeService.mostrarAlerta("Menu Actualizada com Sucesso", "Exito");
          this.modalActual.close("true")
        }else
        this._utilidadeService.mostrarAlerta("Não é possível Actualizar Menu", "Erro");
      },
      error: (err) => {}
    });

  }

}
