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

  constructor(
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private route: Router,
    private authService: AuthService) 
    {
      this.subscriptionCadastroAuth = this.authService.cadastroAuthObservable.subscribe(
        {
          next: (cadastroAuth) => {
            console.log('Autorizado cadastrar Adm:', cadastroAuth);
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
    const usuario = new Usuario(
      this.cadastroForm.value.nome ?? '',
      this.cadastroForm.value.email ?? '',
      this.cadastroForm.value.senha ?? '',
      '',
      this.cadastroForm.value.admin ?? false
    );

    // if (this.id) {
    //   usuario._id = this.id;
    //   usuario.admin = this.cadastroForm.value.admin ?? false;
    //   this.usuariosService.atualizaUsuario(usuario).subscribe({
    //     next: (retorno) => this.route.navigate(["/home"])
    //   });
    // } else {
    this.usuariosService.adicionaUsuario(usuario).subscribe((retorno) => {
      console.log(retorno);
      console.log(usuario);
      this.route.navigate(['/login']);
    });
    // }
  }
}
