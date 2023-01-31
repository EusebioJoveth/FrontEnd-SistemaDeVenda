import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Interfaces/login';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  ocultarPassword:boolean = true;
  mostrarLoading:boolean = false;

  constructor(
    private _formBuilder: FormBuilder, private _usuarioService: UsuarioService,
    private _utilidadeService: UtilidadeService, private router: Router

  ) {
    this.formularioLogin = this._formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {
  }

  iniciarSessao(){
    this.mostrarLoading = true;

    const request: Login = {
      email: this.formularioLogin.value.email,
      password: this.formularioLogin.value.password
    }

    this._usuarioService.iniciarSesao(request).subscribe({
      next: (data) =>{
        if(data.status){
          this._utilidadeService.guardarSessaoUsuario(data.valor);
          this.router.navigate(["pages"])
        }else
        this._utilidadeService.mostrarAlerta("Email ou Senha Errado", "Opps!");
      },
      complete: () =>{
        this.mostrarLoading = false;
      },
      error: () => {
        this._utilidadeService.mostrarAlerta("Houve um Erro", "Opps!")
      }
    })
  }

}
