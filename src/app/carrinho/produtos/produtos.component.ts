import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Produto from 'src/app/model/produto';
import { AuthService } from 'src/app/service/auth.service';
import { ProdutosService } from 'src/app/service/produtos.service';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {


  total: number = 0;

  produtos: Produto[] = [];
  produtosCarrinho: Produto[] = [];

  loggedRole: boolean = false;
  subscriptionLoggedRole: Subscription;

  colunasExibidas: string[] = ["Nome", "Quantidade em Estoque", "Quantidade no Carrinho", "plus", "minus", "Preco", "Ver"]
  panelOpenState: boolean = false;

  colunasExibidasVendedor: string[] = ["Nome", "Quantidade em Estoque","Nova Quantidade", "Preco","Novo Preco", "Editar","Ver"]


  constructor(private produtosService: ProdutosService, private authService: AuthService) {
    this.subscriptionLoggedRole = this.authService.loggedRoleObservable.subscribe(
      {
        next: (loggedRole) => {
          // console.log('Admin:', loggedRole);
          this.loggedRole = loggedRole;
        }
      })
  }



  ngOnInit(): void {
    this.produtos = Array.from(this.produtosService.carregaProdutos());
    this.produtosCarrinho = this.produtos.filter(row => row.quantidadeCompra >= 1);
    this.total = this.totalCarrinho();
  }


  plusProduct(produto: Produto): void {
    if (produto.quantidadeEstoque !== undefined && produto.quantidadeCompra !== undefined)
      if (produto.quantidadeEstoque >= 1) {
        produto.quantidadeCompra++;
        produto.quantidadeEstoque--;
        this.totalCarrinho();
      }

  }

  reporEstoque(produto: Produto): void {
    produto.quantidadeEstoque++;

  }

  reduzirEstoque(produto: Produto): void {
    if (produto.quantidadeEstoque >0)
    produto.quantidadeEstoque--;

  }

  minusProduct(produto: Produto): void {
    if (produto.quantidadeEstoque !== undefined && produto.quantidadeCompra !== undefined)
      if (produto.quantidadeCompra >= 1) {
        produto.quantidadeCompra--;
        produto.quantidadeEstoque++;
      }
    this.totalCarrinho();
  }


  totalCarrinho(): any {
    this.total = 0;
    this.produtos.forEach(produto => {
      if (produto.quantidadeCompra) {
        this.total = this.total + produto.quantidadeCompra * produto.preco;
      }
    });
    return this.total;

  }

}
