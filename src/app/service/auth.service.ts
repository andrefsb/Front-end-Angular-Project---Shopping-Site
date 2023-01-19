import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loginValidoSource = new Subject<boolean>();
  private loggedRoleSource = new Subject<boolean>();
  private loggedIdSource = new Subject<string>();
  private cadastroAuthSource = new Subject<boolean>();

  loggedIdObservable = this.loggedIdSource.asObservable();
  loginValidoObservable = this.loginValidoSource.asObservable();
  loggedRoleObservable = this.loggedRoleSource.asObservable();
  cadastroAuthObservable = this.cadastroAuthSource.asObservable();

  token = localStorage.getItem('token') ?? '';
  id: string = "";
  role: boolean = false;


  constructor(private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  buildHeaders = () =>
    new HttpHeaders().set('X-token', localStorage.getItem('token') ?? '');

  validaLogin = (token: string) =>
    this.http.post(
      'http://localhost:5000/valida',
      { token },
      {
        headers: this.buildHeaders(),
        observe: 'response',
      }
    );

  canActivate(route: ActivatedRouteSnapshot) {

    if (!localStorage.getItem('token') && !route.url[0].path.includes('cadastro') && !route.url[0].path.includes('login')) {
      this.loginValidoSource.next(false);
      console.log('Acesso Negado!');
      this.router.navigate(['/login']);
    }
    else if (route.url[0].path.includes('cadastro') && !this.role && localStorage.getItem('token')) {
      console.log('Você não pode cadastrar novos usuários.', this.role);
      this.router.navigate(['/home']);
    }
    else if (localStorage.getItem('token') && route.url[0].path.includes('login')) {
      console.log('Você já está logado!', this.role);
      this.router.navigate(['/home']);
    }
    else if (!localStorage.getItem('token') && route.url[0].path.includes('cadastro') || route.url[0].path.includes('login')) {
    }

    // else if (route.url[0].path.includes('carrinho') && this.role && localStorage.getItem('token')) {
    //   console.log('Não há carrinho para vendedor.', this.role);
    //   this.router.navigate(['/home']);
    // }
    else {
      this.validaLogin(this.token).subscribe((retorno) => {
        this.loginValidoSource.next(true);
        console.log('Validado!');
        // console.log('Role:', (retorno as any).headers.get('x-roles'))
        // console.log('Retorno:', retorno);
        // console.log(route.url[0].toString());
        this.role = (retorno as any).body.admin;
        this.id = (retorno as any).body._id;
        // console.log('this.role: ', this.role)
        // console.log('this.id: ', this.id)
        this.loggedRoleSource.next(this.role);
        this.loggedIdSource.next(this.id);
        this.cadastroAuthSource.next(this.role);

      });
    }

  }

  login = (email: string, senha: string) =>
    this.http.post('http://localhost:5000/login', { email, senha });

  logoutUser = () =>
    this.http.post('http://localhost:5000/logout', this.getToken());

  persistToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  limpaToken() {
    localStorage.removeItem('token')
    // console.log(localStorage.getItem('token'));
  }

  logout(): void {
    this.logoutUser().subscribe({
      next: (r: any) => {
        this.limpaToken();
        this.router.navigate(['/login']);
        this.loggedRoleSource.next(false);
        this.loginValidoSource.next(false);
      },
      error: (e: any) => {
        console.error("Erro ao fazer o logout", e)
      }
    })
  }
}