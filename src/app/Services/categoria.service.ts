import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import { ResponseApi } from '../Interfaces/response-api';
import { Categoria } from '../Interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private urlApi:string = environment.endpoint + "Categoria/";

  constructor(private _httpClient: HttpClient) { }

  lista():Observable<ResponseApi>{
    return this._httpClient.get<ResponseApi>(`${this.urlApi}Lista`);
  }
  criar(request: Categoria):Observable<ResponseApi>{
    return this._httpClient.post<ResponseApi>(`${this.urlApi}Criar`, request);
  }

  editar(request: Categoria):Observable<ResponseApi>{
    return this._httpClient.put<ResponseApi>(`${this.urlApi}Editar`, request);
  }

  eliminar(id: number):Observable<ResponseApi>{
    return this._httpClient.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`);
  }
}
