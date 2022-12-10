import { login_invalido } from "./trata_erros"
import { RedeSocial, Post } from "./redes_sociais"
import { No, repo_rede_social } from './repositorio'
export { Usuario, IAutenticavel }

abstract class Usuario_base {

    private _id: number;
    private _nome: string;
    private _login: string;
    private _senha: string;

    constructor(id: number, nome: string, login: string, senha: string) {
        this._id = id;
        this._nome = nome;
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

}



interface IAutenticavel {
    autenticar(login: string, senha: string): boolean;
}




class Usuario extends Usuario_base implements IAutenticavel {

    private Repositorio_dados: repo_rede_social = new repo_rede_social()

    constructor(id: number, nome: string, login: string, senha: string) {
        super(id, nome, login, senha);
    }

    consultar_rede_social(id: number): RedeSocial {
        const no: No<RedeSocial> = this.Repositorio_dados.consultar(id)
        const rede_social = no.Valor
        return rede_social
    }

    inserir_rede_social(rede: RedeSocial): void {
        this.Repositorio_dados.inserir(rede)
    }

    excluir_rede_social(id_rede: number): void {
        this.Repositorio_dados.excluir(id_rede)
    }

    exibir_redes_sociais(): void {
        let aux: No<RedeSocial> | null = this.Repositorio_dados.inicio

        console.log('Redes sociais cadastradas: \n')
        console.log('ID - Nome da Rede Social')

        while (aux) {
            console.log(`${aux.Valor.id} - ${aux.Valor.nome}`)
            aux = aux.proximo
        }
        console.log("\n")
    }

    inserir_novo_post(post: Post, id_rede: number): void {
        this.Repositorio_dados.inserir_novo_post(post, id_rede)
    }

    curtir_post(id_rede: number, id_post: number): void {
        const rede: RedeSocial = this.consultar_rede_social(id_rede)
        rede.curtir_post(id_post)
    }

    descurtir_post(id_rede: number, id_post: number): void {
        const rede: RedeSocial = this.consultar_rede_social(id_rede)
        rede.descurtir_post(id_post)
    }

    alterar_post(novo_post: Post, id_rede: number): void {
        this.Repositorio_dados.alterar_post(id_rede, novo_post)
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
