import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavegacaoService {

  constructor(private router: Router,) { }

  navigatePages(rotaName:string){
    this.router.navigate([rotaName]);
  }

  navigatePagesWithId(rotaName:string, id:any){
    this.router.navigate([rotaName, id]);
  }
}
