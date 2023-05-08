import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Imposto } from 'src/app/Interfaces/imposto';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';
import { ImpostoService } from 'src/app/Services/imposto.service';

@Component({
  selector: 'app-modal-imposto',
  templateUrl: './modal-imposto.component.html',
  styleUrls: ['./modal-imposto.component.scss']
})
export class ModalImpostoComponent implements OnInit {

  formImposto: FormGroup;
  tituloAcao:string = "Adicionar";
  botaoAcao:string = "Gravar";

  constructor(
    private modalActual: MatDialogRef<ModalImpostoComponent>,
    @Inject(MAT_DIALOG_DATA) public dadosImposto: Imposto,
    private _formBuilder: FormBuilder,
    private _impostoService: ImpostoService, private _utilidadeService: UtilidadeService
  ) {
    this.formImposto = this._formBuilder.group({
      nome: ['', Validators.required],
      taxa:['', Validators.required],
      descricao:['',],
    });

    if(this.dadosImposto !=null){
      this.tituloAcao = "Editar";
      this.botaoAcao = "Actualizar";
    }
  }

  ngOnInit(): void {
    if(this.dadosImposto != null){
      this.formImposto.patchValue({
        nome: this.dadosImposto.nome,
        descricao: this.dadosImposto.descricao,
        taxa: this.dadosImposto.taxa.toString()
      });
    }
  }

  gravarOuEditarImposto(){
    const imposto: Imposto = {
      idImposto: this.dadosImposto == null ? 0 : this.dadosImposto.idImposto,
      nome: this.formImposto.value.nome,
      descricao: this.formImposto.value.descricao,
      taxa: this.converterValorPercentagem(this.formImposto.value.taxa)
    }

    if(this.dadosImposto == null)
       this.criar(imposto);
    else
       this.editar(imposto);
  }

  criar(imposto:Imposto){
    this._impostoService.criar(imposto).subscribe({
      next:(dado) =>{
        if(dado.status){
          this._utilidadeService.mostrarAlerta("Imposto Registada com Sucesso", "Exito");
          this.modalActual.close("true")
        }else
        this._utilidadeService.mostrarAlerta("Não é possível Registar Imposto", "Erro");
      },
      error: (err) => {}
    });
  }

  editar(imposto:Imposto){
    this._impostoService.editar(imposto).subscribe({
      next:(dado) =>{
        if(dado.status){
          this._utilidadeService.mostrarAlerta("Imposto Actualizada com Sucesso", "Exito");
          this.modalActual.close("true")
        }else
        this._utilidadeService.mostrarAlerta("Não é possível Actualizar Imposto", "Erro");
      },
      error: (err) => {}
    });

  }

  converterValorPercentagem(valor:number){
    return (valor/100).toString();
  }

}
