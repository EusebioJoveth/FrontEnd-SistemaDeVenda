import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import { ResponseApi } from '../Interfaces/response-api';
import { Menu } from '../Interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private urlApi:string = environment.endpoint + "Menu/";

  constructor(private _httpClient: HttpClient) { }

  lista(idUsuario:number):Observable<ResponseApi>{
    return this._httpClient.get<ResponseApi>(`${this.urlApi}Lista?idUsuario=${idUsuario}`);
  }

  menus():Observable<ResponseApi>{
    return this._httpClient.get<ResponseApi>(`${this.urlApi}Menus`);
  }

  criar(request: Menu):Observable<ResponseApi>{
    return this._httpClient.post<ResponseApi>(`${this.urlApi}Criar`, request);
  }

  editar(request: Menu):Observable<ResponseApi>{
    return this._httpClient.put<ResponseApi>(`${this.urlApi}Editar`, request);
  }

  eliminar(id: number):Observable<ResponseApi>{
    return this._httpClient.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`);
  }
}
