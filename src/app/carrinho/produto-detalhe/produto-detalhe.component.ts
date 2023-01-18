import Produto from 'src/app/model/produto';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css']
})
export class ProdutoDetalheComponent {

  constructor(private produtosService: ProdutosService) {

  }


}
