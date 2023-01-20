import { AuthService } from './../../service/auth.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Produto from 'src/app/model/produto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css']
})
export class ProdutoDetalheComponent {

  id: number = 0;
  produto: Produto = new Produto(0, '', 0, 0, 0, '', '')
  loggedRole: boolean = false;
  subscriptionLoggedRole: Subscription;


  constructor(private produtosService: ProdutosService, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.subscriptionLoggedRole = this.authService.loggedRoleObservable.subscribe(
      {
        next: (loggedRole) => {
          // console.log('Admin:', loggedRole);
          this.loggedRole = loggedRole;
        }
      })
  }


  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    console.log('Id do produto:', this.id)
    if (this.id) {
      this.produto = this.produtosService.retornaProduto(this.id)
    }
    else {
      this.router.navigate(['/home']);
    }
  }


}
