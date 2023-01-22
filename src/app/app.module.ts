import { HeaderComponent } from './shared/header/header.component';
import { RoutingComponent } from './routing/routing.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { ProdutoDetalheComponent } from './carrinho/produto-detalhe/produto-detalhe.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioDetalheComponent } from './usuario-detalhe/usuario-detalhe.component';
import { MenuUsuariosComponent } from './pages/menu-usuarios/menu-usuarios.component';
import { ProdutosDialogModule } from './carrinho/produtos/produtos-dialog/produtos-dialog.module';
import { ProdutosComponent } from './carrinho/produtos/produtos.component';




const routes: Routes =[{
  
path:'routing-component',
component: RoutingComponent
}];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    RoutingComponent,
    ProdutosComponent,
    ProdutoDetalheComponent,
    PageNotFoundComponent,
    UsuarioDetalheComponent,
    MenuUsuariosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProdutosDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
