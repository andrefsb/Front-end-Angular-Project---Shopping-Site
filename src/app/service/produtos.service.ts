import { Injectable } from '@angular/core';
import Produto from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produto: Produto = new Produto(0, '', 0, 0, 0, '', '')
  ok: boolean = true;

  produtosClone: Set<Produto> = new Set<Produto>();

  produtos: Set<Produto> = new Set<Produto>().add({
    id: 1,
    nome: "Mouse",
    preco: 20,
    quantidadeEstoque: 7,
    quantidadeCompra: 0,
    descricao: "Mouse óptico para computador, entrada USB.",
    imagem: 'https://img.kalunga.com.br/fotosdeprodutos/436527d.jpg'

  }).add({

    id: 2,
    nome: "Teclado",
    preco: 45,
    quantidadeEstoque: 6,
    quantidadeCompra: 0,
    descricao: "Teclado para computador, entrada USB.",
    imagem: 'https://imgs.extra.com.br/1521784115/1xg.jpg?imwidth=500'

  }).add({

    id: 3,
    nome: "Headphone",
    preco: 180.99,
    quantidadeEstoque: 5,
    quantidadeCompra: 0,
    descricao: "Headphone bluetooth.",
    imagem: 'https://edifier.com.br/pub/media/catalog/product/f/o/fone-de-ouvido-headphone-w820bt-edifier-preto.jpg'

  })
  .add({

    id: 4,
    nome: "Monitor",
    preco: 1080.95,
    quantidadeEstoque: 9,
    quantidadeCompra: 0,
    descricao: "Monitor LCD full HD",
    imagem: 'https://images.tcdn.com.br/img/img_prod/1066780/monitor_acer_gamer_nitro_23_8_led_full_hd_2x_hdmi_display_port_freesync_165hz_qg241y_5423_3_2b83bbc949d96e96c280cc324f820435.jpg'

  })
  .add({

    id: 5,
    nome: "Controle para PC",
    preco: 48.99,
    quantidadeEstoque: 12,
    quantidadeCompra: 0,
    descricao: "Entrada USB",
    imagem: 'https://img.kalunga.com.br/fotosdeprodutos/672868z.jpg'

    
  })
  .add({

    id: 6,
    nome: "DVD",
    preco: 0.99,
    quantidadeEstoque: 75,
    quantidadeCompra: 0,
    descricao: "DVD regravável",
    imagem: 'https://m.media-amazon.com/images/I/81DBby4O-WL._AC_SY450_.jpg'


  });

  constructor() { }

  getProdutos = () => this.produtos;

  lastId() {
    return this.produtos.size + 1;
  }

  retornaProduto(id: number) {

    this.produtosClone.clear();

    this.produtos.forEach(produto => {
      this.produtosClone.add(produto);
    });

    this.produtosClone.forEach(produto => {
      if (produto.id == id) {
        this.produto = produto;
      }
    });

    console.log('retornaProduto:', this.produto)
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

  delete(produto: Produto) {
    var deletado = false;
    this.produtos.forEach(element => {
      if (element.id == produto.id) {
        deletado = this.produtos.delete(element);
      }
    });
    console.log('Deletado?', deletado)
  }

  removerProdutos(compra: any) {

  }


  //   this.produtosDsp = JSON.parse(localStorage.getItem('disponivel') || "[]");
  //   if(this.produtosDsp.size==undefined || this.produtosDsp.size==0){
  // this.produtos.add({
  //   id: 1,
  //   nome: "Mouse",
  //   preco: 20,
  //   quantidadeEstoque: 4,
  //   quantidadeCompra: 0,
  //   descricao: "Mouse óptico para computador, entrada USB.",
  //   imagem: 'https://img.kalunga.com.br/fotosdeprodutos/436527d.jpg'

  // }).add({

  //   id: 2,
  //   nome: "Teclado",
  //   preco: 35,
  //   quantidadeEstoque: 2,
  //   quantidadeCompra: 0,
  //   descricao: "Teclado para computador, entrada USB.",
  //   imagem: 'https://m.media-amazon.com/images/I/51nx+6ZS6cL._AC_SL1000_.jpg'

  // }).add({

  //   id: 3,
  //   nome: "Headphone",
  //   preco: 80.99,
  //   quantidadeEstoque: 9,
  //   quantidadeCompra: 0,
  //   descricao: "Headphone bluetooth.",
  //   imagem: 'https://m.media-amazon.com/images/I/41NqUMUFHjL._AC_SL1000_.jpg'

  // });

  //   }
  //   else{
  //     this.produtos=this.produtosDsp;

  //   }
  //   console.log('this.produtos:',this.produtos)
  //   return this.produtos;
  // }
}


