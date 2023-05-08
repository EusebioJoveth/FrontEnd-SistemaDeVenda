import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Categoria } from 'src/app/Interfaces/categoria';
import { Marca } from 'src/app/Interfaces/marca';
import { Imposto } from 'src/app/Interfaces/imposto';
import { Produto } from 'src/app/Interfaces/produto';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { MarcaService } from 'src/app/Services/marca.service';
import { ImpostoService } from 'src/app/Services/imposto.service';
import { ProdutoService } from 'src/app/Services/produto.service';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';

@Component({
  selector: 'app-modal-produto',
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.scss']
})
export class ModalProdutoComponent implements OnInit {

  formProduto: FormGroup;
  tituloAccao:string = "Adicionar";
  botaoAcao:string = "Guardar";
  listaCategoria: Categoria[] = [];
  listaMarca: Marca[] = [];
  listaImposto: Imposto[] = [];

  constructor(
    private modalActual: MatDialogRef<ModalProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public dadosProduto:Produto,
    private _formBuilder: FormBuilder, private _categoriaService: CategoriaService,
    private _marcaService: MarcaService, private _impostoService: ImpostoService,
    private _utilidadeService: UtilidadeService, private _produtoService: ProdutoService
  ) {
    this.formProduto = this._formBuilder.group({
      nome: ["", Validators.required],
      codigo:["", ],
      idCategoria: ["", Validators.required],
      idMarca: ["",],
      idImposto:["",],
      stock:["", Validators.required],
      preco:["", Validators.required],
      foto: ["",],
      isActivo:["1", Validators.required]

    });

    if(this.dadosProduto != null){
      this.botaoAcao = "Editar";
      this.tituloAccao = "Actualizar";
    }

    this.consultasDependencias();
   }

  ngOnInit(): void {
    if(this.dadosProduto != null){
      this.formProduto.patchValue({
        nome: this.dadosProduto.nome,
        codigo: this.dadosProduto.codigo,
        idCategoria: this.dadosProduto.idCategoria,
        idMarca: this.dadosProduto.idMarca,
        idImposto: this.dadosProduto.idImposto,
        stock: this.dadosProduto.stock,
        preco: this.dadosProduto.preco,
        foto: this.dadosProduto.foto,
        isActivo: this.dadosProduto.isActivo.toString()
      });
    }
  }

  guardarEditar_Produto(){
    const _produto: Produto = {
      idProduto: this.dadosProduto == null?0: this.dadosProduto.idProduto,
      nome:this.formProduto.value.nome,
      codigo:this.formProduto.value.codigo,
      idCategoria:this.formProduto.value.idCategoria,
      descricaoCategoria: "",
      idMarca:this.formProduto.value.idMarca,
      descricaoMarca: "",
      idImposto:this.formProduto.value.idImposto,
      descricaoImposto: "",
      stock:this.formProduto.value.stock,
      preco: this.formProduto.value.preco,
      isActivo:parseInt(this.formProduto.value.isActivo),
      foto:this.formProduto.value.foto
    }

    if(this.dadosProduto == null){
      this.adicionarProduto(_produto);
    }else{
      this.editarProduto(_produto);
    }

  }

  adicionarProduto(produto:Produto){
    this._produtoService.criar(produto).subscribe({
      next: (produtoData) =>{
        if(produtoData.status){
          this._utilidadeService.mostrarAlerta("Produto registado", "Éxito");
          this.modalActual.close("true")
        }else
          this._utilidadeService.mostrarAlerta("Não é possível registar Produto", "Erro")
      },
        error: (err)=>{}
    });

  }

  editarProduto(produto:Produto){
    this._produtoService.editar(produto).subscribe({
      next: (produtoData) =>{
        if(produtoData.status){
          this._utilidadeService.mostrarAlerta("Dados do Produto actualizado", "Éxito");
          this.modalActual.close("true")
        }else
          this._utilidadeService.mostrarAlerta("Não é possível actualizar Produto", "Erro")
      },
        error: (err)=>{}
    });

  }

  consultasDependencias(){
    this._categoriaService.lista().subscribe({
      next: (categoriadata) =>{
        if(categoriadata.status) this.listaCategoria = categoriadata.valor
      },
      error: (err) =>{}
    });

    this._marcaService.lista().subscribe({
      next: (marcadata) =>{
        if(marcadata.status) this.listaMarca = marcadata.valor
      },
      error: (err) =>{}
    });

    this._impostoService.lista().subscribe({
      next: (impostodata) =>{
        if(impostodata.status) this.listaImposto = impostodata.valor
      },
      error: (err) =>{}
    });
   }

}
