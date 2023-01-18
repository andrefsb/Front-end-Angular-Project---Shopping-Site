import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from './../service/usuarios.service';
import { Component, OnInit } from '@angular/core';
import Usuario from '../model/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.css']
})
export class UsuarioDetalheComponent implements OnInit {
  id: any;
  activatedRoute: any;
  cadastroForm: any;
  formBuilder: any;
 

  constructor(private usuariosService: UsuariosService, private route: ActivatedRoute, private authService:AuthService) { }
    

  pageName: string = "Seu Usuário"
  usuarios: Usuario[] = [];


  ngOnInit() {
    console.log('Id no OnInit cadastro-usuario: ', this.id)

    if (this.id) {
      this.usuariosService.retornaUsuario(this.id).subscribe({
        next: (usuario) => {
          console.log(usuario);
          this.cadastroForm = this.formBuilder.group({
            nome: usuario.nome,
            email: usuario.email,
            senha: '',
            admin: usuario.admin,
          });
        },
        error: (error) => console.error(error)
      })
    }
  }

  remover(user: Usuario) {
    this.usuariosService.removerUsuario(user).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(
          (usuario) => usuario._id != user._id
        );
      },
    });
    this.authService.logout();
  }
}




