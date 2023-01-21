import { Injectable } from '@angular/core';
import Produto from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produto: Produto = new Produto(0, '', 0, 0, 0, '', '')
  ok: boolean = true;

  produtos: Set<Produto> = new Set<Produto>().add({
    id: 1,
    nome: "Mouse",
    preco: 20,
    quantidadeEstoque: 4,
    quantidadeCompra: 0,
    descricao: "Mouse óptico para computador, entrada USB.",
    imagem: 'https://img.kalunga.com.br/fotosdeprodutos/436527d.jpg'

  }).add({

    id: 2,
    nome: "Teclado",
    preco: 35,
    quantidadeEstoque: 2,
    quantidadeCompra: 0,
    descricao: "Teclado para computador, entrada USB.",
    imagem: 'https://m.media-amazon.com/images/I/51nx+6ZS6cL._AC_SL1000_.jpg'

  }).add({

    id: 3,
    nome: "Headphone",
    preco: 80.99,
    quantidadeEstoque: 9,
    quantidadeCompra: 0,
    descricao: "Headphone bluetooth.",
    imagem: 'https://m.media-amazon.com/images/I/41NqUMUFHjL._AC_SL1000_.jpg'

  });

  constructor() { }

  carregaProdutos = () => this.produtos;

  lastId() {
    return this.produtos.size + 1;
  }

  retornaProduto(id: number) {
    this.produtos.forEach(produto => {
      if (produto.id == id) {
        this.produto = produto;
      }
    });
    return this.produto;
  }

  post(produtoAdd: Produto): boolean {

    this.produtos.forEach(produto => {
      if (produto.nome == produtoAdd.nome) {
        alert("Produto já cadastrado!")
        this.ok = false;
      }
    });
    if (this.ok) {
      this.produtos.add(produtoAdd);
    }
    return this.ok;
  }

  delete(produto: Produto){
    this.produtos.delete(produto);
  }

  removerProdutos(compra:any){

  }

}
