import { Router } from '@angular/router';
import { CarrinhoService } from './../../service/carrinho.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import Produto from 'src/app/model/produto';
import { AuthService } from 'src/app/service/auth.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { MatDialog } from '@angular/material/dialog';
import { ProdutosDialogComponent } from './produtos-dialog/produtos-dialog.component';



@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {


  total: number = 0;

  produto: Produto = new Produto(0, '', 0, 0, 0, '', '');

  produtoEdit: Produto = new Produto(0, '', 0, 0, 0, '', '');

  produtoCarrinho: Produto = new Produto(0, '', 0, 0, 0, '', '');

  produtosCopia: Produto[] = [];
  produtos: Produto[] = [];
  produtosClone: Produto[] = [];
  produtosCarrinho: Produto[] = [];
  produtosEdit: Produto[] = [];

  passedValues: Produto = new Produto(0, '', 0, 0, 0, '', '');
  quantidadeEstoque: number = 0;
  preco: number = 0;

  loggedRole: boolean = false;

  subscriptionLoggedRole: Subscription;

  subscriptionLoggedId: Subscription;


  loggedId: string = '';

  id: number = 0;
  totalProdutos: number = 0;

  colunasExibidas: string[] = ["Nome", "Quantidade em Estoque", "Quantidade no Carrinho", "plus", "minus", "Preco", "Ver"]
  panelOpenState: boolean = false;

  colunasExibidasVendedor: string[] = ["Nome", "Quantidade em Estoque", "Preco", "Editar", "Ver"]

  cadastroForm = this.formBuilder.group({
    id: 0,
    nome: '',
    preco: 0,
    quantidadeEstoque: 0,
    quantidadeCompra: 0,
    descricao: '',
    imagem: ''
  });

  atualizaForm = this.formBuilder.group({
    id: 0,
    nome: '',
    preco: 0,
    quantidadeEstoque: 0,
    quantidadeCompra: 0,
    descricao: '',
    imagem: ''
  });

  constructor(private produtosService: ProdutosService, private authService: AuthService, private formBuilder: FormBuilder, private carrinhoService: CarrinhoService, private router: Router, public dialog: MatDialog) {
    this.subscriptionLoggedRole = this.authService.loggedRoleObservable.subscribe(
      {
        next: (loggedRole) => {
          this.loggedRole = loggedRole;
          // console.log('loggedRole:', loggedRole)
        }
      });
    this.subscriptionLoggedId = this.authService.loggedIdObservable.subscribe(
      {
        next: (loggedId) => {
          this.loggedId = loggedId;

          if (this.router.url.includes('carrinho')) {
            console.log('ENTROU NO CARRINHO');
            this.validCarrinho();
          }
        }
      });
  }

  // ngOnInit(): void {


  //   // if (this.id) {
  //   //   this.produto = this.produtosService.retornaProduto(this.id);

  //   //       this.cadastroForm = this.formBuilder.group({
  //   //         id: this.produto.id,
  //   //         nome: this.produto.nome,
  //   //         preco: this.produto.preco,
  //   //         quantidadeCompra: this.produto.quantidadeCompra,
  //   //         quantidadeEstoque: this.produto.quantidadeEstoque,
  //   //         descricao: this.produto.descricao,
  //   //         imagem: this.produto.imagem
  //   //       });
  //   // }
  // }

  plusProduct(produto: Produto): void {
    if (produto.quantidadeEstoque !== undefined && produto.quantidadeCompra !== undefined)
      if (produto.quantidadeEstoque >= 1) {
        produto.quantidadeCompra++;
        produto.quantidadeEstoque--;
      }
    this.totalCarrinho();
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
    this.produtosClone.forEach(produto => {
      if (produto.quantidadeCompra > 0) {
        this.total = this.total + produto.quantidadeCompra * produto.preco;
      }
    });
    this.produtosClone = this.produtosClone.filter(row => row.quantidadeCompra >= 1);
    this.carrinhoService.salvarCarrinho(this.loggedId, this.produtosClone);
    return this.total;

  }

  finalizarCompra() {
    this.produtosClone = this.produtos.filter(row => row.quantidadeCompra >= 1);
    if (this.produtosClone.length >= 1) {
      console.log('Compra Finalizada!', this.produtosCarrinho);
      this.produtos = this.produtosClone;
      this.produtosClone.forEach(prodClone => {
        this.carrinhoService.atualizarCarrinho(this.loggedId, this.produtosCarrinho, prodClone.id, prodClone.quantidadeCompra, prodClone.nome, prodClone.quantidadeEstoque, prodClone.preco, prodClone.descricao, prodClone.imagem)
      });
      console.log('Em estoque:', this.produtosService.getProdutos())
    }
    else {
      console.log('Seu carrinho está vazio!', this.produtosCarrinho);
      alert("Seu carrinho está vazio!")
    }
  }

  validCarrinho() {
    this.produtos = Array.from(this.produtosService.getProdutos());
    this.produtosClone = [];
    // console.log('produtos.service produtos:', Array.from(this.produtosService.getProdutos()));
    if (!this.loggedRole) {
      this.produtosClone = this.produtos.map(x => Object.assign({}, x));
      // console.log('Clone antes:', this.produtosClone)
      // console.log('LoggedId no load carrinho:', this.loggedId)
      this.produtosCarrinho = this.carrinhoService.getCarrinho(this.loggedId).map((x: any) => Object.assign({}, x));
      this.produtosCarrinho.forEach(prodcar => {
        this.produtosClone.forEach(prodclon => {
          if (prodcar.id == prodclon.id) {
            prodclon.quantidadeCompra = prodcar.quantidadeCompra;
            if (prodclon.quantidadeEstoque < prodclon.quantidadeCompra) {
              prodclon.quantidadeCompra = prodclon.quantidadeEstoque;
            }
            else {
              prodclon.quantidadeEstoque -= prodclon.quantidadeCompra;
            }
          }

        });
      });
      // console.log('Clone depois:', this.produtosClone)
      this.total = this.totalCarrinho();
    }
    else {
      this.produtosEdit = Array.from(this.produtosService.getProdutos()).map(x => Object.assign({}, x));
      this.totalProdutos = this.produtos.length;
    }

  }


  // reporEstoque(produto: Produto): void {
  //   produto.quantidadeEstoque++;

  // }

  // reduzirEstoque(produto: Produto): void {
  //   if (produto.quantidadeEstoque > 0)
  //     produto.quantidadeEstoque--;

  // }


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
      this.produtosEdit = Array.from(this.produtosService.getProdutos()).map(x => Object.assign({}, x));
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

  openDialog(produto: Produto): void {
    this.produtoEdit = { ...produto };
    const dialogRef = this.dialog.open(ProdutosDialogComponent, {
      width: '260px',
      data: { quantidadeEstoque: this.produto.quantidadeEstoque, preco: this.produto.preco }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Produto:', produto);
      console.log('The dialog was closed');
      console.log('All the data', result);
      this.produtoEdit = {
        id: produto.id,
        nome: produto.nome,
        preco: +result.preco,
        quantidadeCompra: produto.quantidadeCompra,
        quantidadeEstoque: +result.quantidadeEstoque,
        descricao: produto.descricao,
        imagem: produto.imagem
      };
      console.log('Produto novo:', this.produtoEdit);
      this.produtosService.delete(produto);
      console.log('lista antes:',this.produtosService.getProdutos())
      this.produtosService.post(this.produtoEdit);
      console.log('lista depois:',this.produtosService.getProdutos())
      this.produtosEdit = Array.from(this.produtosService.getProdutos()).map(x => Object.assign({}, x));

    });
  }


}
