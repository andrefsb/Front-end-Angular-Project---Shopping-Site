import Produto from "./produto";

export default class Carrinho {
    data: Date;
    endereco?: string = "";
    userId: string = "";
    itens: Produto[] = [];

    constructor(data: Date, endereco: string, userId: string, itens: any) {
        this.data = new Date();
        this.endereco = endereco;
        this.userId = userId;
        this.itens = itens;
        
    }
}