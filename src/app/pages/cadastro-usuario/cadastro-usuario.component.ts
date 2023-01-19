import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from 'src/app/service/usuarios.service';
import Usuario from 'src/app/model/usuario';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
})
export class CadastroUsuarioComponent {


  id: string = "";
  pageName: string = "Cadastro";

  cadastroAuth: boolean = false;
  subscriptionCadastroAuth: Subscription;

  usuario: Usuario = new Usuario("", "", "", "", false)

  constructor(
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private route: Router,
    private authService: AuthService) {
    this.subscriptionCadastroAuth = this.authService.cadastroAuthObservable.subscribe(
      {
        next: (cadastroAuth) => {
          // console.log('Autorizado cadastrar Adm:', cadastroAuth);
          this.cadastroAuth = cadastroAuth;
        }
      })
  }

  cadastroForm = this.formBuilder.group({
    nome: '',
    email: '',
    senha: '',
    admin: false
  });

  onSubmit() {
    if (!this.cadastroForm.value.nome || !this.cadastroForm.value.email || !this.cadastroForm.value.senha) {
      alert("Necessário preencher todos os campos.")
    }
    else {
      this.usuario = new Usuario(
        this.cadastroForm.value.nome ?? '',
        this.cadastroForm.value.email ?? '',
        this.cadastroForm.value.senha ?? '',
        '',
        this.cadastroForm.value.admin ?? false
      );

      this.usuariosService.adicionaUsuario(this.usuario).subscribe((retorno) => {
        console.log(retorno);
        this.route.navigate(['/login']);
      });
    }
  }
}

