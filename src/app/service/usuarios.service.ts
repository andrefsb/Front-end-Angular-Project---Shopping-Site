import { AuthService } from './auth.service';
import { catchError, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Usuario from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  id: string = this.authService.id;

  constructor(private http: HttpClient, private authService: AuthService) { }

  adicionaUsuario = (usuario: Usuario) =>
    this.http.post('http://localhost:5000/signup', usuario)
 

  listaUsuarios = (): Observable<Usuario[]> =>
    this.http.get<Usuario[]>('http://localhost:5000/usuarios', {
      headers: this.authService.buildHeaders(),
    });

    retornaUsuario = (id: String) =>
    this.http.get<Usuario>(`http://localhost:5000/usuarios/${id}`, {
      headers: this.authService.buildHeaders(),
    });

  atualizaUsuario = (usuario: Usuario) =>
    this.http.put(`http://localhost:5000/usuarios/${usuario._id}`, usuario, {
      headers: this.authService.buildHeaders(),
    });

  removerUsuario = (usuario: Usuario) : any =>
    this.http
      .delete(`http://localhost:5000/usuarios/${usuario._id}`, {
        headers: this.authService.buildHeaders(),
      });

      
  buscaUsuario = (nome: string): Observable<Usuario[]> =>
    this.http.get<Usuario[]>(`http://localhost:5000/busca?nome=${nome}`, {
      headers: this.authService.buildHeaders(),
    });

  buscaEmail = (email: string): Observable<Usuario[]> =>
    this.http.get<Usuario[]>(`http://localhost:5000/buscaemail?email=${email}`, {
      headers: this.authService.buildHeaders(),
    });

     
}
