abstract class Usuario_base {

    private _id: number;
    private _nome: string;
    private _login: string;
    private _senha: string;
    private _idade: number;

    constructor(id: number, nome: string, idade: number, login: string, senha: string) {
        this._id = id;
        this._nome = nome;
        this._idade = idade;
        this._login = login;
        this._senha = senha;
    }

    get id(): number {
        return this._id;
    }

    get nome(): string {
        return this._nome;
    }

    get login(): string {
        return this._login
    }

    get senha(): string {
        return this._senha;
    }

    get idade(): number {
        return this._idade
    }
}



interface IAutenticavel {
    autenticar(login: string, senha: string): boolean;
}




class Usuario_V extends Usuario_base implements IAutenticavel{

    private Repositorio_dados: Repositorio_redes

    constructor(id: number, nome: string, idade: number, login: string, senha: string, Repositorio: Repositorio_redes) {
        super(id, nome, idade, login, senha);
        this.Repositorio_dados = Repositorio
    }

    consultar_rede_social(id: number): RedeSocial {
       return this.Repositorio_dados.consultar_rede_social(id)
    }

    inserir_rede_social(rede: RedeSocial): void {
         this.Repositorio_dados.inserir_rede_social(rede)
    }

    excluir_rede_social(id_rede: number): void {
        this.Repositorio_dados.excluir_rede_social(id_rede)
    }

    inserir_novo_post(post: Post, id_rede: number): void {
        this.Repositorio_dados.inserir_novo_post(post, id_rede)
    }

    alterar_post(id_post: number, novo_txt: string, nova_legenda: string, id_rede: number): void {
       this.Repositorio_dados.alterar_post(id_post, novo_txt, nova_legenda, id_rede)
    }

    excluir_post(id_post: number, id_rede: number): void {
        this.Repositorio_dados.excluir_post(id_post, id_rede);
        
    }


    autenticar(login: string, senha: string): boolean {
        if (login != this.login || senha != this.senha) {
            throw new login_invalido("Erro, login inválido!!!")
        }
        return true;
    }
}



import { login_invalido, rede_social_inexistente } from "./trata_erros"
import { RedeSocial, Post } from "./redes_sociais"
import { Repositorio_redes } from './repositorio'
export { Usuario_V, IAutenticavel }
