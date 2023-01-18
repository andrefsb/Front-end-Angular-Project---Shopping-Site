import { UsuariosService } from './../service/usuarios.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import Usuario from '../model/usuario';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  hasError: boolean = false;
  searchField: FormControl = new FormControl();

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    this.usuarioService.listaUsuarios().subscribe({
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
        switchMap((pesquisa) => this.usuarioService.buscaUsuario(pesquisa))
      )
      .subscribe((usuarios) => (this.usuarios = usuarios));
  }

  remover(user: Usuario): void {
    this.usuarioService.removerUsuario(user).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(
          (usuario) => usuario._id != user._id
        );
      },
    });
  }
}