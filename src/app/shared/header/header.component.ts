import { UsuariosService } from './../../service/usuarios.service';
import { AuthService } from 'src/app/service/auth.service';
import { Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  subscriptionLoginValido: Subscription;
  subscriptionLoggedRole: Subscription;

  loginValido: boolean = false;
  loggedRole: boolean = false;
  subscriptionLoggedId: Subscription;

  loggedId: string = '';


  constructor(private authService: AuthService) {
    this.subscriptionLoginValido = this.authService.loginValidoObservable.subscribe(
      {
        next: (loginValido) => {
          // console.log('Logado:', loginValido);
          this.loginValido = loginValido;
        }
      }),

      this.subscriptionLoggedRole = this.authService.loggedRoleObservable.subscribe(
        {
          next: (loggedRole) => {
            // console.log('Admin:', loggedRole);
            this.loggedRole = loggedRole;
          }
        }),
      this.subscriptionLoggedId = this.authService.loggedIdObservable.subscribe(
        {
          next: (loggedId) => {
            // console.log('Id logado:', loggedId);
            this.loggedId = loggedId;
          }
        });
  }


  headerLogout() {
    this.authService.logout();
    this.loginValido = false;
    this.loggedRole = false;
  }
}




