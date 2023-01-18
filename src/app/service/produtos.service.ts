import { Injectable } from '@angular/core';
import Produto from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produtos: Set<Produto> = new  Set<Produto>().add({
    id: 1,
    nome:"Mouse",
    preco: 20,
    quantidadeEstoque:4,
    quantidadeCompra: 1,
    descricao: "Mouse óptico para computador, entrada USB."

  }).add({

    id: 2,
    nome:"Teclado",
    preco: 35,
    quantidadeEstoque:2,
    quantidadeCompra: 1,
    descricao: "Teclado para computador, entrada USB."

  }).add({

    id: 3,
    nome:"Headphone",
    preco: 80.99,
    quantidadeEstoque:9,
    quantidadeCompra: 0,
    descricao: "Headphone bluetooth."

  });

  constructor() { }

  carregaProdutos = ()=> this.produtos;


  
}
