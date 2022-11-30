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


class Usuario extends Usuario_base implements IAutenticavel {

    private Redes_sociais: RedeSocial[] = []

    constructor(id: number, nome: string, idade: number, login: string, senha: string) {
        super(id, nome, idade, login, senha);
    }

    consultar_rede_social(id: number): RedeSocial {
        for (let rede of this.Redes_sociais) {
            if (rede.id == id) {
                return rede
            }
        }
        throw new rede_social_inexistente("Erro, rede social inexistente!!!")
    }

    private consultar_index_rede_social(id: number): number {
        for (let i = 0; i < this.Redes_sociais.length; i++) {
            if (this.Redes_sociais[i].id == id) {
                return i
            }
        }
        throw new rede_social_inexistente("Erro, rede social inexistente!!!")
    }

    inserir_rede_social(rede: RedeSocial): void {
        this.consultar_rede_social(rede.id)
        this.Redes_sociais.push(rede);
    }

    excluir_rede_social(id_rede: number): void {
        const index: number = this.consultar_index_rede_social(id_rede);

        for (let i = index; i < this.Redes_sociais.length; i++) {
            this.Redes_sociais[i] = this.Redes_sociais[i + 1]
        }
        this.Redes_sociais.push()
    }

    inserir_novo_post(post: Post, id_rede: number): void {
        const index: number = this.consultar_index_rede_social(id_rede);
        this.Redes_sociais[index].inserir_post(post);
    }

    alterar_post(id_post: number, novo_txt: string, nova_legenda: string, id_rede: number): void {
        const index: number = this.consultar_index_rede_social(id_rede);
        this.Redes_sociais[index].alterar_post(id_post, novo_txt, nova_legenda);
    }

    excluir_post(id_post: number, id_rede: number): void {
        const index: number = this.consultar_index_rede_social(id_rede)
        this.Redes_sociais[index].excluir_post(id_post);
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
export { Usuario, IAutenticavel }
