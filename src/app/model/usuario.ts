export default class Usuario {
  nome: string = '';
  email: string = '';
  senha: string = '';
  _id: string = '';
  admin: boolean = false;

  constructor(nome: string, email: string, senha: string, id: string, admin: boolean) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this._id = id;
    this.admin = admin;
  }
}

