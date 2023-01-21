import { ProdutosService } from 'src/app/service/produtos.service';
import { Component, OnInit } from '@angular/core';
import Produto from 'src/app/model/produto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageName: string = "Home";
  produtos: Produto[] = [];

  constructor(private produtosService: ProdutosService) { }


  ngOnInit(): void {

    this.produtos = Array.from(this.produtosService.carregaProdutos());

  }

  
}



