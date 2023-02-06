import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Rol } from 'src/app/Interfaces/rol';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadeService } from 'src/app/Reutilizavel/utilidade.service';
import { RolService } from '../../../../Services/rol.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.scss']
})
export class ModalUsuarioComponent implements OnInit {

  formularioUsuario: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccao:string = "Adicionar";
  botaoAcao:string = "Guardar";
  listaRol: Rol[] = [];

  constructor(
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public dadosUsuario:Usuario,
    private _formBuilder: FormBuilder, private _rolService: RolService,
    private _usuarioService: UsuarioService, private _utilidadeService: UtilidadeService
  ) {
    this.formularioUsuario = this._formBuilder.group({
      nome: ["", Validators.required],
      sobrenome: ["", Validators.required],
      email: ["", Validators.required],
      idRol: ["", Validators.required],
      password: ["", Validators.required],
      isActivo: ["1", Validators.required],
      telefone: ["",],
      genero: ["",Validators.required],
      foto:["",]
    });

    if(this.dadosUsuario != null){
      this.botaoAcao = "Editar";
      this.tituloAccao = "Actualizar";
    }

    this._rolService.lista().subscribe({
      next: (roldata) =>{
        if(roldata.status) this.listaRol = roldata.valor
      },
      error: (err) =>{}
    });
  }

  ngOnInit(): void {
    if(this.dadosUsuario != null){
      this.formularioUsuario.patchValue({
        nome: this.dadosUsuario.nome,
        sobrenome: this.dadosUsuario.sobrenome,
        email: this.dadosUsuario.email,
        idRol: this.dadosUsuario.idRol,
        password:this.dadosUsuario.password,
        isActivo: this.dadosUsuario.isActivo.toString(),
        telefone:this.dadosUsuario.telefone,
        genero: this.dadosUsuario.genero,
        foto:this.dadosUsuario.foto
      });
    }
  }

  guardarEditar_Usuario(){
    const _usuario: Usuario = {
      idUsuario: this.dadosUsuario == null?0: this.dadosUsuario.idUsuario,
      nome:this.formularioUsuario.value.nome,
      sobrenome:this.formularioUsuario.value.sobrenome,
      email:this.formularioUsuario.value.email,
      idRol:this.formularioUsuario.value.idRol,
      rolDescricao:"",
      password:this.formularioUsuario.value.password,
      isActivo:parseInt(this.formularioUsuario.value.isActivo),
      telefone:this.formularioUsuario.value.telefone,
      genero: this.formularioUsuario.value.genero,
      foto:this.formularioUsuario.value.foto
    }

    if(this.dadosUsuario == null){
      this.criarUsuario(_usuario);
    }else{
      this.editarUsuario(_usuario);
    }

  }

  criarUsuario(usuario:Usuario){
    this._usuarioService.criar(usuario).subscribe({
      next: (userData) =>{
        if(userData.status){
          this._utilidadeService.mostrarAlerta("Usuario registado", "Éxito");
          this.modalActual.close("true")
        }else
          this._utilidadeService.mostrarAlerta("Não é possível registar Usuario", "Erro")
      },
        error: (err)=>{}
    });

  }

  editarUsuario(usuario:Usuario){
    this._usuarioService.editar(usuario).subscribe({
      next: (userData) =>{
        if(userData.status){
          this._utilidadeService.mostrarAlerta("Dados do Usuario actualizado", "Éxito");
          this.modalActual.close("true")
        }else
          this._utilidadeService.mostrarAlerta("Não é possível actualizar Usuario", "Erro")
      },
        error: (err)=>{}
    });

  }

}
