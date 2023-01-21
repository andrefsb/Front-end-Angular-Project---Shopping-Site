import Produto from "./produto";

export default class Carrinho {
    id: number = 0;
    userId: string = "";
    itens: Produto[] = [];


    constructor(id: number, userId: string, itens: any) {
        this.id = id;
        this.userId = userId;
        this.itens = itens;
    }
}