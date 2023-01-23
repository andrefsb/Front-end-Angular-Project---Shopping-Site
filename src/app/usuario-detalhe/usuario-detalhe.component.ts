import { CarrinhoService } from './../service/carrinho.service';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from './../service/usuarios.service';
import { Component, OnInit } from '@angular/core';
import Usuario from '../model/usuario';
import Carrinho from '../model/carrinho';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.css']
})
export class UsuarioDetalheComponent implements OnInit {
  userForm: any;
  formBuilder: any;
  ActivatedRoute: any;
  compras: Carrinho[] = [];
  usuario: Usuario = new Usuario("", "", "", "", false);
  compra: Carrinho = new Carrinho(new Date(), '', '', 0);
  comprasKey: string = '';

  id: string = '';
  pageName: string = "Seu Usuário"

  constructor(private usuariosService: UsuariosService, private authService: AuthService, private activatedRoute: ActivatedRoute, private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    /*  console.log('id na busca do usuario:', this.id) */
    if (this.id) {
      this.usuariosService.retornaUsuario(this.id).subscribe({
        next: (usuario) => {
          console.log(usuario);
          this.usuario = usuario;
        },
        error: (error) => console.error(error)
      })

      this.comprasKey = this.id + 'compras';
      console.log(this.comprasKey)
      this.compras = this.carrinhoService.vizualizarCompras(this.comprasKey)
        .subscribe((arg: any) => this.compra= arg);
      
      console.log('Minhas Compras:', this.compras)
      console.log(this.compras)
    }

  }

  remover(user: Usuario) {
    // console.log('User removido:',user)
    this.usuariosService.removerUsuario(user).subscribe();
    this.authService.logout();
  }
}






