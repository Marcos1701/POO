abstract class Usuario_base {

    private _id: string;
    private _nome: string;
    private _email: string;
    private _senha: string;
    private _idade: number;

    constructor(id: string, nome: string, idade: number, email: string, senha: string) {
        this._id = id;
        this._nome = nome;
        this._idade = idade;
        this._email = email;
        this._senha = senha;
    }

    get id(): string {
        return this._id;
    }

    get nome(): string {
        return this._nome;
    }

    get email(): string {
        return this._email;
    }

    get senha(): string {
        return this._senha;
    }

    get idade(): number {
        return this._idade
    }
}



interface IAutenticavel {
    autenticar(email: string, senha: string): boolean;
}


class Usuario extends Usuario_base implements IAutenticavel {

    private Redes_sociais: RedeSocial[] = []

    constructor(id: string, nome: string, idade: number, email: string, senha: string) {
        super(id, nome, idade, email, senha);
    }

    consultar_rede_social(id: string): RedeSocial {
        for (let rede of this.Redes_sociais) {
            if (rede.id == id) {
                return rede
            }
        }
        throw new rede_social_inexistente("Erro, rede social inexistente!!!")
    }

    private consultar_index_rede_social(id: string): number {
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

    excluir_rede_social(id_rede: string): void {
        const index: number = this.consultar_index_rede_social(id_rede);

        for (let i = index; i < this.Redes_sociais.length; i++) {
            this.Redes_sociais[i] = this.Redes_sociais[i + 1]
        }
        this.Redes_sociais.push()
    }

    inserir_novo_post(post: Post, id_rede: string): void {
        const index: number = this.consultar_index_rede_social(id_rede);
        this.Redes_sociais[index].inserir_post(post);
    }

    alterar_post(id_post: string, novo_txt: string, nova_legenda: string, id_rede: string): void {
        const index: number = this.consultar_index_rede_social(id_rede);
        this.Redes_sociais[index].alterar_post(id_post, novo_txt, nova_legenda);
    }

    excluir_post(id_post: string, id_rede: string): void {
        const index: number = this.consultar_index_rede_social(id_rede)
        this.Redes_sociais[index].excluir_post(id_post);
    }


    autenticar(email: string, senha: string): boolean {
        if (email != this.email || senha != this.senha) {
            throw new login_invalido("Erro, login inválido!!!")
        }
        return true;
    }
}



import { login_invalido, rede_social_inexistente } from "./trata_erros"
import { RedeSocial, Post } from "./redes_sociais"
export { Usuario, IAutenticavel }
