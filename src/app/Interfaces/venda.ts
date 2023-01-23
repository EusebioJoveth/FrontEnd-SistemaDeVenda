import { DetalheVenda } from './detalhe-venda';

export interface Venda {
  idVenda?:number,
  numeroDocumento?:string,
  tipoPagamento:string,
  dataRegisto?:string,
  total:string,
  detalheVenda: DetalheVenda[]
}
