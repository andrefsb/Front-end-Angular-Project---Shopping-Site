import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from './../service/usuarios.service';
import { Component, OnInit } from '@angular/core';
import Usuario from '../model/usuario';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.css']
})
export class UsuarioDetalheComponent implements OnInit {
  userForm: any;
  formBuilder: any;
  ActivatedRoute: any;
  usuario: Usuario = new Usuario("","","","",false);

  id: string = '';
  pageName: string = "Seu Usuário"

  constructor(private usuariosService: UsuariosService, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    console.log('id na busca do usuario:', this.id)
    if (this.id) {
      this.usuariosService.retornaUsuario(this.id).subscribe({
        next: (usuario) => {
          console.log(usuario);
          this.usuario = usuario;
        },
        error: (error) => console.error(error)
      })
    }
  }

  remover(user: Usuario) {
    console.log('User:',user)
    this.usuariosService.removerUsuario(user);
    this.authService.logout();
  }
}




