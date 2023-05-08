import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Venda } from 'src/app/Interfaces/venda';
import { DetalheVenda } from 'src/app/Interfaces/detalhe-venda';


@Component({
  selector: 'app-modal-detail-venda',
  templateUrl: './modal-detail-venda.component.html',
  styleUrls: ['./modal-detail-venda.component.scss']
})
export class ModalDetailVendaComponent implements OnInit {
  dataRegisto:string="";
  numeroDocumento:string="";
  tipoPagamento:string="";
  desconto:string = "";
  total:string = "";
  detalheVenda: DetalheVenda[] = [];
  colunasTabela:string[] = ['produto', 'quantidade', 'preco', 'desconto', 'total'];

  constructor(@Inject(MAT_DIALOG_DATA) public _venda: Venda) {
    this.dataRegisto = _venda.dataRegisto!;
    this.numeroDocumento = _venda.numeroDocumento!;
    this.tipoPagamento = _venda.tipoPagamento;
    this.total = _venda.totalTexto;
    this.detalheVenda = _venda.detalheVenda;
  }

  ngOnInit(): void {
  }

}
