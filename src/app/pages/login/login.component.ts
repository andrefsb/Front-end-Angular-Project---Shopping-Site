import { FormBuilder } from '@angular/forms';
import { UsuariosService } from '../../service/usuarios.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent {

  pageName: string = "Login";
  hasError: boolean = false;

  constructor(private usuariosService: UsuariosService,private authService: AuthService, private formBuilder: FormBuilder,private route: Router){

  }

  loginForm = this.formBuilder.group({
    email:"",
    senha:""
  })

  onSubmit() {
    this.authService.login(
      this.loginForm.value.email ?? '',
      this.loginForm.value.senha ?? ''
    ).subscribe({
      next: (retorno) => {
        this.authService.persistToken((retorno as any).accessToken);
        this.route.navigate(["/home"]);
      },
      error: (error) => {
        this.hasError = true;
      }
    } 
    )
  }

}
