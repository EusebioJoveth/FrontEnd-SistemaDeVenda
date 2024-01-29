import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import { ResponseApi } from '../Interfaces/response-api';
import {Login} from "../Interfaces/login";
import {Usuario} from "../Interfaces/usuario";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlApi: string = environment.endpoint + "Usuario/";

  constructor(private _httpClient: HttpClient) { }

  iniciarSesao(request: Login):Observable<ResponseApi>{
    return this._httpClient.post<ResponseApi>(`${this.urlApi}IniciarSesao`, request);
  }

  obterDadosDoUserLogado(){
    const user =  JSON.parse(localStorage.getItem('usuario')!);
    return user
  }

  lista():Observable<ResponseApi>{
    return this._httpClient.get<ResponseApi>(`${this.urlApi}Lista`)
  }

  criar(request: Usuario):Observable<ResponseApi>{
    return this._httpClient.post<ResponseApi>(`${this.urlApi}Criar`, request);
  }

  editar(request: Usuario):Observable<ResponseApi>{
    return this._httpClient.put<ResponseApi>(`${this.urlApi}Editar`, request);
  }

  eliminar(id: number):Observable<ResponseApi>{
    return this._httpClient.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`);
  }
}
