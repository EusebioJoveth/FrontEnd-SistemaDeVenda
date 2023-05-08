import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Marca } from 'src/app/Interfaces/marca';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';
import { MarcaService } from '../../../../Services/marca.service';


@Component({
  selector: 'app-modal-marca',
  templateUrl: './modal-marca.component.html',
  styleUrls: ['./modal-marca.component.scss']
})
export class ModalMarcaComponent implements OnInit {

  formMarca: FormGroup;
  tituloAcao:string = "Adicionar";
  botaoAcao:string = "Gravar";

  constructor(
    private modalActual: MatDialogRef<ModalMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public dadosMarca: Marca,
    private _formBuilder: FormBuilder,
    private _marcaService: MarcaService, private _utilidadeService: UtilidadeService
  ) {
    this.formMarca = this._formBuilder.group({
      nome: ['', Validators.required],
      descricao:['',],
      isActivo:['1',]
    });

    if(this.dadosMarca !=null){
      this.tituloAcao = "Editar";
      this.botaoAcao = "Actualizar";
    }
  }

  ngOnInit(): void {
    if(this.dadosMarca != null){
      this.formMarca.patchValue({
        nome: this.dadosMarca.nome,
        descricao: this.dadosMarca.descricao,
        isActivo: this.dadosMarca.isActivo.toString()
      });
    }
  }

  gravarOuEditarMarca(){
    const marca: Marca = {
      idMarca: this.dadosMarca == null ? 0 : this.dadosMarca.idMarca,
      nome: this.formMarca.value.nome,
      descricao: this.formMarca.value.descricao,
      isActivo: parseInt (this.formMarca.value.isActivo)
    }

    if(this.dadosMarca == null)
       this.criar(marca);
    else
       this.editar(marca);
  }

  criar(marca:Marca){
    this._marcaService.criar(marca).subscribe({
      next:(dado) =>{
        if(dado.status){
          this._utilidadeService.mostrarAlerta("Marca Registada com Sucesso", "Exito");
          this.modalActual.close("true")
        }else
        this._utilidadeService.mostrarAlerta("Não é possível Registar Marca", "Erro");
      },
      error: (err) => {}
    });
  }

  editar(marca:Marca){
    this._marcaService.editar(marca).subscribe({
      next:(dado) =>{
        if(dado.status){
          this._utilidadeService.mostrarAlerta("Marca Actualizada com Sucesso", "Exito");
          this.modalActual.close("true")
        }else
        this._utilidadeService.mostrarAlerta("Não é possível Actualizar Marca", "Erro");
      },
      error: (err) => {}
    });

  }

}
