import { CarrinhoService } from './../../service/carrinho.service';
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
  quantidadeCarrinho: number = 0;
  produto: Produto = new Produto(0, '', 0, 0, 0, '', '')
  produtoCarrinho: Produto = new Produto(0, '', 0, 0, 0, '', '')
  loggedRole: boolean = false;
  subscriptionLoggedRole: Subscription;
  produtosCarrinho: Produto[] = [];
  subscriptionLoggedId: Subscription;

  produtoFinal: Produto = new Produto(0, '', 0, 0, 0, '', '')

  loggedId: string = '';


  constructor(private produtosService: ProdutosService, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService, private carrinhoService: CarrinhoService) {
    this.subscriptionLoggedRole = this.authService.loggedRoleObservable.subscribe(
      {
        next: (loggedRole) => {
          // console.log('Admin:', loggedRole);
          this.loggedRole = loggedRole;
        }
      });
    this.subscriptionLoggedId = this.authService.loggedIdObservable.subscribe(
      {
        next: (loggedId) => {
          this.loggedId = loggedId;
          this.id = this.activatedRoute.snapshot.params["id"];
          this.produtosCarrinho = this.carrinhoService.getCarrinho(this.loggedId);
          console.log('Id do produto:', this.id)
          console.log('quantidade carrinho:', this.produtosCarrinho)

          if (this.id) {
            this.produto = this.produtosService.retornaProduto(this.id);
            this.produtoCarrinho = this.carrinhoService.retornaProdutoCarrinho(this.loggedId, this.id)
            this.quantidadeCarrinho = this.produtoCarrinho.quantidadeCompra;

            if (this.quantidadeCarrinho > this.produto.quantidadeEstoque) {
              this.quantidadeCarrinho = this.produto.quantidadeEstoque;
            }
          }
          else {
            this.router.navigate(['/home']);
          }
        }
      });
  }


  ngOnInit(): void {

  }

  plusProduct(produto: Produto): void {
    if (produto.quantidadeEstoque !== undefined && this.quantidadeCarrinho !== undefined) {
      if (produto.quantidadeEstoque >= 1) {
        this.quantidadeCarrinho++;
        produto.quantidadeEstoque--;
      }
    }
  }

  minusProduct(produto: Produto): void {
    if (produto.quantidadeEstoque !== undefined && this.quantidadeCarrinho !== undefined) {
      if (this.quantidadeCarrinho >= 1) {
        this.quantidadeCarrinho--;
        produto.quantidadeEstoque++;
      }
    }

  }
  enviaItemCarrinho() {
    if (this.quantidadeCarrinho > 0) {
      this.carrinhoService.atualizarCarrinho(this.loggedId, this.produtosCarrinho, this.produto.id, this.quantidadeCarrinho, this.produto.nome, this.produto.quantidadeEstoque, this.produto.preco, this.produto.descricao, this.produto.imagem);
      alert(this.quantidadeCarrinho + 'x ' + this.produto.nome + ' adicionado ao seu carrinho!')
    }
  }


}
