import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuUsuariosComponent } from '../pages/menu-usuarios/menu-usuarios.component';
import { UsuariosComponent } from './usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}