import { HeaderComponent } from './../../shared/header/header.component';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import Usuario from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './menu-usuarios.component.html',
  styleUrls: ['./menu-usuarios.component.css']
})
export class MenuUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  hasError: boolean = false;
  searchField: FormControl = new FormControl();
  subscriptionLoggedId: Subscription;

  loggedId: string = '';

  pageName: string = "Usuários";


  constructor(private usuariosService: UsuariosService, private authService: AuthService) {
    this.subscriptionLoggedId = this.authService.loggedIdObservable.subscribe(
      {
        next: (loggedId) => {
          console.log('Id logado:', loggedId);
          this.loggedId = loggedId;
        }
      })
  }

  ngOnInit(): void {
    this.usuariosService.listaUsuarios().subscribe({
      next: (response) => {
        this.usuarios = response;
      },
      error: (error) => {
        this.hasError = true;
      },

    });

    this.searchField.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((pesquisa) => this.usuariosService.buscaUsuario(pesquisa))
      )
      .subscribe((usuarios) => (this.usuarios = usuarios));

    console.log('Lista de usuarios:', this.usuarios.toString())
  }

  remover(user: Usuario) {
    this.usuariosService.removerUsuario(user).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(
          (usuario) => usuario._id != user._id
        );
      },
    });
    if (this.loggedId == user._id) {
      console.log('LOGOUT')
      this.authService.logout();
    }
  }

}
