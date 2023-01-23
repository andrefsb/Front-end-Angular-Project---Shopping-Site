import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Carrinho from '../model/carrinho';
import Produto from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  produtosCarrinho: Produto[] = [];
  produtoBusca: Produto = new Produto(0, '', 0, 0, 0, '', '');
  produtoCarrinho: Produto = new Produto(0, '', 0, 0, 0, '', '');
  novoCarrinho: Produto[] = [];
  novoProduto: Produto = new Produto(0, '', 0, 0, 0, '', '');
  minhasCompras: Carrinho[] = [];

  constructor() { }


  getCarrinho(key: string) {
    console.log('Key:',key)
    console.log('Meu carrinho de getCarrinho: ',JSON.parse(localStorage.getItem(key) || "[]") )
    return JSON.parse(localStorage.getItem(key) || "[]");
  }

  atualizarCarrinho(key: string, value: any, itemId: number, qtd: number, name: string, qtdE: number, preco:number, desc:string, img: string ) {
    this.produtoBusca = this.retornaProdutoCarrinho(key, itemId)
    this.produtosCarrinho = this.getCarrinho(key);
    this.novoCarrinho = this.produtosCarrinho.filter(function(el) { return el.nome != name; });
    this.novoCarrinho[this.novoCarrinho.length] = {
      id: itemId,
      nome: name,
      preco: preco,
      quantidadeEstoque: qtdE,
      quantidadeCompra: qtd,
      descricao:desc,
      imagem:img
    };
    this.salvarCarrinho(key, this.novoCarrinho);
  }

  salvarCarrinho(key: string, value: any) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
    // console.log('salvar local Storage:', key,value)
  }

  retornaProdutoCarrinho(key: string, id: number) {
    this.produtosCarrinho = this.getCarrinho(key);
    // console.log('this.produtosCarrinho',this.produtosCarrinho)

    this.produtosCarrinho.forEach(prod => {
      if (prod.id == id) {
        this.produtoCarrinho = prod;
      }
    });
    // console.log('this.produtoCarrinho',this.produtoCarrinho)
    return this.produtoCarrinho;
  }

  deletarCarrinho(key: string){
    localStorage.removeItem(key);
  }

  salvarCompra(key: string, value: any) {
    
    this.minhasCompras = this.vizualizarCompras(key);
    value = JSON.stringify(value);
    this.minhasCompras.push(value);
    localStorage.setItem(key, value);
    console.log('salvar compras local Storage:', key,value)
  }

  vizualizarCompras(key: string) {
    console.log('Minhas compras: ',JSON.parse(localStorage.getItem(key) || "[]") )
    console.log('Key:',key)
    return JSON.parse(localStorage.getItem(key) || "[]");
  }

}
