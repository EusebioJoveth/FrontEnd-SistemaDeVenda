import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/Interfaces/categoria';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';


@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.scss']
})
export class ModalCategoriaComponent implements OnInit {

  formularioCategoria: FormGroup;
  tituloAcao: string = "Adicionar";
  botaoAcao: string = "Gravar";

  constructor(
    private modalActual: MatDialogRef<ModalCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public dadosCategoria: Categoria,
    private _formBuilder: FormBuilder, private _categoriaService: CategoriaService,
    private _utilidadeService: UtilidadeService
  ) {
    this.formularioCategoria = this._formBuilder.group({
      nome: ['', Validators.required],
      descricao:['',],
      isActivo:['1',]
    });

    if(this.dadosCategoria !=null){
      this.tituloAcao = "Editar";
      this.botaoAcao = "Actualizar";
    }
  }

  ngOnInit(): void {
    if(this.dadosCategoria != null){
      this.formularioCategoria.patchValue({
        nome: this.dadosCategoria.nome,
        descricao: this.dadosCategoria.descricao,
        isActivo: this.dadosCategoria.isActivo.toString()
      });
    }
  }

  gravarOuEditarCategoria(){
    const _categoria: Categoria = {
      idCategoria: this.dadosCategoria == null ? 0 : this.dadosCategoria.idCategoria,
      nome: this.formularioCategoria.value.nome,
      descricao: this.formularioCategoria.value.descricao,
      isActivo: parseInt (this.formularioCategoria.value.isActivo)
    }

    if(this.dadosCategoria == null)
       this.criar(_categoria);
    else
       this.editar(_categoria);
  }


  criar(categoria:Categoria){
    this._categoriaService.criar(categoria).subscribe({
      next:(dado) =>{
        if(dado.status){
          this._utilidadeService.mostrarAlerta("Categoria Registada com Sucesso", "Exito");
          this.modalActual.close("true")
        }else
        this._utilidadeService.mostrarAlerta("Não é possível Registar Categoria", "Erro");
      },
      error: (err) => {}
    });
  }

  editar(categoria:Categoria){
    this._categoriaService.editar(categoria).subscribe({
      next:(dado) =>{
        if(dado.status){
          this._utilidadeService.mostrarAlerta("Categoria Actualizada com Sucesso", "Exito");
          this.modalActual.close("true")
        }else
        this._utilidadeService.mostrarAlerta("Não é possível Actualizar Categoria", "Erro");
      },
      error: (err) => {}
    });

  }

}
