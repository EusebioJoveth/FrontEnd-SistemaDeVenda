import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private urlApi:string = environment.endpoint + "Rol/";

  constructor(private _httpClient: HttpClient) { }

  lista():Observable<ResponseApi>{
    return this._httpClient.get<ResponseApi>(`${this.urlApi}Lista`);
  }
}
