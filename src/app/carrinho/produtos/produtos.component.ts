import { CarrinhoService } from './../../service/carrinho.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  produto: Produto = new Produto(0, '', 0, 0, 0, '', '')

  produtosCopia: Produto[] = [];
  produtos: Produto[] = [];
  produtosClone: Produto[] = [];
  produtosCarrinho: Produto[] = [];

  loggedRole: boolean = false;
  subscriptionLoggedRole: Subscription;

  subscriptionLoggedId: Subscription;

  loggedId: string = '';

  id: number = 0;
  totalProdutos: number = 0;

  colunasExibidas: string[] = ["Nome", "Quantidade em Estoque", "Quantidade no Carrinho", "plus", "minus", "Preco", "Ver"]
  panelOpenState: boolean = false;

  colunasExibidasVendedor: string[] = ["Nome", "Quantidade em Estoque", "Nova Quantidade", "Preco", "Novo Preco", "Editar", "Ver"]

  cadastroForm = this.formBuilder.group({
    id: 0,
    nome: '',
    preco: 0,
    quantidadeEstoque: 0,
    quantidadeCompra: 0,
    descricao: '',
    imagem: ''
  });

  constructor(private produtosService: ProdutosService, private authService: AuthService, private formBuilder: FormBuilder, private carrinhoService: CarrinhoService) {
    this.subscriptionLoggedRole = this.authService.loggedRoleObservable.subscribe(
      {
        next: (loggedRole) => {
          this.loggedRole = loggedRole;
          console.log('loggedRole:',loggedRole)
        }
      });
      this.subscriptionLoggedId = this.authService.loggedIdObservable.subscribe(
        {
          next: (loggedId) => {
            this.loggedId = loggedId;
            if (!this.loggedRole) {
              this.produtosClone = [...this.produtos];
              console.log('LoggedId no load carrinho:',this.loggedId)
              this.produtosCarrinho = this.carrinhoService.getCarrinho(this.loggedId);
              console.log('Carrinho em local:', this.produtosCarrinho)
              this.total = this.totalCarrinho();
            }
          }
        });
  }

  ngOnInit(): void {
    
    this.produtos = Array.from(this.produtosService.carregaProdutos());
    this.totalProdutos = this.produtos.length;
    

    // if (this.id) {
    //   this.produto = this.produtosService.retornaProduto(this.id);

    //       this.cadastroForm = this.formBuilder.group({
    //         id: this.produto.id,
    //         nome: this.produto.nome,
    //         preco: this.produto.preco,
    //         quantidadeCompra: this.produto.quantidadeCompra,
    //         quantidadeEstoque: this.produto.quantidadeEstoque,
    //         descricao: this.produto.descricao,
    //         imagem: this.produto.imagem
    //       });
    // }
  }

  plusProduct(produto: Produto): void {
    if (produto.quantidadeEstoque !== undefined && produto.quantidadeCompra !== undefined)
      if (produto.quantidadeEstoque >= 1) {
        produto.quantidadeCompra++;
        produto.quantidadeEstoque--;
        this.totalCarrinho();
      }

  }

  minusProduct(produto: Produto): void {
    if (produto.quantidadeEstoque !== undefined && produto.quantidadeCompra !== undefined)
      if (produto.quantidadeCompra >= 1) {
        produto.quantidadeCompra--;
        produto.quantidadeEstoque++;
      }
    this.totalCarrinho();
  }

  reporEstoque(produto: Produto): void {
    produto.quantidadeEstoque++;

  }

  reduzirEstoque(produto: Produto): void {
    if (produto.quantidadeEstoque > 0)
      produto.quantidadeEstoque--;

  }

  totalCarrinho(): any {
    this.total = 0;
    this.produtosClone.forEach(produto => {
      if (produto.quantidadeCompra) {
        this.total = this.total + produto.quantidadeCompra * produto.preco;
      }
    });
    this.produtosCarrinho = this.produtosCarrinho.filter(row => row.quantidadeCompra >= 1);
    this.carrinhoService.salvarCarrinho(this.loggedId, this.produtosCarrinho);
    return this.total;

  }

  salvarAlteracao(produto: Produto) {
    console.log('Alterações salvar para:', produto)
  }

  adicionarProduto() {

    // this.cadastroForm = this.formBuilder.group({
    //   id: this.produtosService.lastId(),
    //   nome: "Webcam",
    //   preco: 42.99,
    //   quantidadeEstoque: 3,
    //   quantidadeCompra: 0,
    //   descricao: "Webcam HD",
    //   imagem: 'https://m.media-amazon.com/images/I/41NqUMUFHjL._AC_SL1000_.jpg'
    // });

    const novoProduto = new Produto(
      this.cadastroForm.value.id = this.produtosService.lastId(),
      this.cadastroForm.value.nome ?? '',
      this.cadastroForm.value.preco ?? 0,
      this.cadastroForm.value.quantidadeEstoque ?? 0,
      this.cadastroForm.value.quantidadeCompra ?? 0,
      this.cadastroForm.value.descricao ?? '',
      this.cadastroForm.value.imagem ?? '',
    );
    var okForm = true;
    var okProd = false;

    if (!novoProduto.id || !novoProduto.nome || !novoProduto.preco || !novoProduto.descricao || !novoProduto.imagem) {
      alert("Preencha todos os campos!");
      okForm = false;
    }
    if (okForm && novoProduto.preco > 0) {
      var okProd = this.produtosService.post(novoProduto);
      this.produtos = Array.from(this.produtosService.carregaProdutos());
      this.totalProdutos = this.produtos.length;
    }
    console.log(novoProduto);

    if (okProd) {
      console.log('Adicionado:', novoProduto)
    }
    else {
      alert('Cadastro não realizado! Valor não inserido ou inválido!')
    }
  }

  finalizarCompra() {
    this.produtosCarrinho = this.produtos.filter(row => row.quantidadeCompra >= 1);
    if (this.produtosCarrinho.length >= 1) {
      console.log('Compra Finalizada!', this.produtosCarrinho);
      this.produtos = this.produtosClone;
      console.log('Em estoque:', this.produtosService.carregaProdutos())
    }
    else {
      console.log('Seu carrinho está vazio!', this.produtosCarrinho);
      alert("Seu carrinho está vazio!")
    }
  }


}
