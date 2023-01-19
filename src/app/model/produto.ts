export default class Produto {
    id: number = 0;
    nome: string = "";
    preco: number = 0;
    quantidadeEstoque: number=0;
    quantidadeCompra: number =0;
    descricao: string ="";
    imagem: string='';

    constructor(nome: string, preco: number, quantidadeEstoque: number,  descricao: string, quantidadeCompra: number, imagem:string){
        this.nome = nome;
        this.preco = preco;
        this.quantidadeEstoque = quantidadeEstoque;
        this.quantidadeCompra=quantidadeCompra;
        this.descricao=descricao;
        this.descricao=descricao;
        this.imagem=imagem;
    }
}