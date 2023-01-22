import { AuthService } from './service/auth.service';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdutoDetalheComponent } from './carrinho/produto-detalhe/produto-detalhe.component';
import { ProdutosComponent } from './carrinho/produtos/produtos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UsuarioDetalheComponent } from './usuario-detalhe/usuario-detalhe.component';
import { MenuUsuariosComponent } from './pages/menu-usuarios/menu-usuarios.component';

const routes: Routes = [{
  path: 'usuarios',
  component: MenuUsuariosComponent,
  canActivate: [AuthService]
},
{
  path: 'usuarios/:id',
  component: UsuarioDetalheComponent,
  canActivate: [AuthService]
},
{
  path: 'carrinho',
  component: ProdutosComponent,
  canActivate: [AuthService]
},
{
  path: 'produto/:id',
  component: ProdutoDetalheComponent,
  canActivate: [AuthService]
},
{
  path: 'login',
  component: LoginComponent,
  canActivate: [AuthService]
},

{
  path: 'home',
  component: HomeComponent,
  canActivate: [AuthService]
},
{
  path: 'cadastro',
  component: CadastroUsuarioComponent,
  canActivate: [AuthService]
},
{ path: "", redirectTo: "login", pathMatch: "full" },
{ path: "**", component: PageNotFoundComponent }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
