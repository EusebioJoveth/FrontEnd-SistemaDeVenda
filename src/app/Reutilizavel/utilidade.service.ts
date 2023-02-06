import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sessao } from '../Interfaces/sessao';

@Injectable({
  providedIn: 'root'
})
export class UtilidadeService {

  constructor(private _snackBar: MatSnackBar) { }

  mostrarAlerta(mensagem: string, tipo:string){
    this._snackBar.open(mensagem, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 300
    });
  }

  guardarSessaoUsuario(usuarioSessao: Sessao){
    localStorage.setItem("usuario", JSON.stringify(usuarioSessao));
  }

  obterSessaoUsuario(){
    const dadoCorrente = localStorage.getItem("usuario");
    const usuario = JSON.parse(dadoCorrente!);

    return usuario;
  }

  eliminarSessaoUsuario(){
    localStorage.removeItem("usuario");
  }
}
