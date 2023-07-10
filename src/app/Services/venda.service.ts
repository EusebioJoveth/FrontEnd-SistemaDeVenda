import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import { ResponseApi } from '../Interfaces/response-api';
import { Venda } from '../Interfaces/venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private urlApi:string = environment.endpoint + "Venda/";

  constructor(private _httpClient: HttpClient) { }

  registar(request: Venda):Observable<ResponseApi>{
    return this._httpClient.post<ResponseApi>(`${this.urlApi}Criar`, request);
  }

  historial(buscarPor:string, numeroVenda:string, dataInicio:string, dataFinal:string):Observable<ResponseApi>{
    return this._httpClient.get<ResponseApi>(`${this.urlApi}Historial?buscarPor=${buscarPor}&numeroVenda=${numeroVenda}&dataInicio=${dataInicio}&dataFim=${dataFinal}`);
  }

  reporte(dataInicio:string, dataFinal:string):Observable<ResponseApi>{
    return this._httpClient.get<ResponseApi>(`${this.urlApi}Reporte?dataInicio=${dataInicio}&dataFim=${dataFinal}`);
  }


}
