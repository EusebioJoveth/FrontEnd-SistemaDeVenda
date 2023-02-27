import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoService } from 'src/app/Services/produto.service';
import { VendaService } from 'src/app/Services/venda.service';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';

import { Produto } from 'src/app/Interfaces/produto';
import { Venda } from 'src/app/Interfaces/venda';
import { DetalheVenda } from 'src/app/Interfaces/detalhe-venda';

import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {
  itemsBreadCrumb: MenuItem[];
  home: MenuItem;

  listaProdutos:Produto[] = [];
  listaProdutosFiltro:Produto[] = [];

  listaProdutosParaVenda:DetalheVenda[] = [];
  bloquerBotaoRegistar: boolean = false;

  produtoSelecionado!: Produto;
  tipoPagamentoPorDefeito:string = "Em dinheiro";
  totalPagar: number = 0;

  formProdutoVenda: FormGroup;
  colunasTabela:string[] = ['produto', 'quantidade', 'preco', 'desconto', 'total', 'acoes'];
  dadosDetalheVenda = new MatTableDataSource(this.listaProdutosParaVenda);
  @ViewChild(MatPaginator) paginacaoTabela!: MatPaginator

  returnProdutosPorFiltro(pesquisa:any):Produto[]{
    const valorPesquisado = typeof pesquisa === "string"?pesquisa.toLocaleLowerCase():pesquisa.nome.toLocaleLowerCase();

    return this.listaProdutos.filter(item => item.nome.toLocaleLowerCase().includes(valorPesquisado));
  }

  constructor(
    private _formBuilder: FormBuilder, private _produtoService: ProdutoService,
    private _vendaService:VendaService, private _utilidadeService: UtilidadeService
  ) {
    this.itemsBreadCrumb = [
      {label: 'Páginas'},
      {label: 'Vendas'},
  ];

  this.home = {icon: 'pi pi-shopping-bag', routerLink: '/pages/vendas'};

    this.formProdutoVenda = this._formBuilder.group({
      produto: ["", Validators.required],
      quantidade: ["", Validators.required],
      desconto: [0,]
    });

    this._produtoService.lista().subscribe({
      next:(dados) =>{
        if(dados.status){
          const lista = dados.valor as Produto[];
          this.listaProdutos = lista.filter(produt => produt.isActivo == 1 && produt.stock > 0);
        }
      },
      error: (e) => {}
    });

    this.formProdutoVenda.get('produto')?.valueChanges.subscribe(value =>{
      this.listaProdutosFiltro = this.returnProdutosPorFiltro(value);
    });
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dadosDetalheVenda.paginator = this.paginacaoTabela;
}

  mostrarProduto(produto: Produto): string{
    return produto.nome;
  }

  produtoParaVenda(event:any){
    this.produtoSelecionado = event.option.value;
  }

  adicionarProdutoParaVenda(){
    const _quantidade: number = this.formProdutoVenda.value.quantidade;
    const _desconto: number = this.formProdutoVenda.value.desconto / 100;
    const _preco: number = parseFloat(this.produtoSelecionado.preco);
    const _total: number = this.calcularTotal(_quantidade, _preco, _desconto);
    this.totalPagar = this.totalPagar + _total;

    this.listaProdutosParaVenda.push({
      idProduto: this.produtoSelecionado.idProduto,
      descricaoProduto: this.produtoSelecionado.nome,
      quantidade: _quantidade,
      precoTexto: String(_preco.toFixed(2)),
      desconto: `${_desconto * 100}`,
      totalTexto: String(_total.toFixed(2))
    });

    this.dadosDetalheVenda = new MatTableDataSource(this.listaProdutosParaVenda);

    this.formProdutoVenda.patchValue({
      produto: '',
      quantidade: '',
      desconto: 0
    });

    this.dadosDetalheVenda.paginator = this.paginacaoTabela;
  }

  eliminarProduto(detalhe: DetalheVenda){
    this.totalPagar = this.totalPagar - parseFloat(detalhe.totalTexto);
    this.listaProdutosParaVenda = this.listaProdutosParaVenda.filter(produt => produt.idProduto != detalhe.idProduto);

    this.dadosDetalheVenda = new MatTableDataSource(this.listaProdutosParaVenda);
  }

  registarVenda(){
    if(this.listaProdutosParaVenda.length > 0){
      this.bloquerBotaoRegistar = true;
      console.log('totalA Pagar', this.totalPagar)

      const request: Venda = {
        tipoPagamento: this.tipoPagamentoPorDefeito,
        totalTexto: String(this.totalPagar.toFixed(2)),
        detalheVenda: this.listaProdutosParaVenda
      }

      console.log('request', request)

      this._vendaService.registar(request).subscribe({
        next:(response) =>{
          console.log('response', response)
         if(response.status){
          this.totalPagar = 0.00;
          this.listaProdutosParaVenda = [];
          this.dadosDetalheVenda = new MatTableDataSource(this.listaProdutosParaVenda);

          Swal.fire({
            icon: 'success',
            'title': 'Venda Registada',
            'text': `Número de venda: ${response.valor.numeroDocumento} `
          });
         }else
         this._utilidadeService.mostrarAlerta("Não é possível registrar a venda", "Ops!")
        },
        complete: () =>{
          this.bloquerBotaoRegistar = false;
        },
        error: (e) => {console.log('erro', e)}
      });
    }
  }

  calcularTotal(quantidade:number, preco:number, desconto:number):number{
 return (quantidade * preco) - ((quantidade * preco) * desconto)
  }

}
