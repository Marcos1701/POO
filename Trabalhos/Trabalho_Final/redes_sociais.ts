import { IAutenticavel, Usuario } from "./usuarios";
import { post_inexistente, ValorInvalido, Valor_inexistente } from "./trata_erros";
import { repo_post } from './repositorio'
export { RedeSocial, Post }

class Post {
    private _id: number
    private _texto: string
    private _autor: Usuario
    private _curtidas: number
    private _legenda: string
    private _data: Date

    constructor(
        id: number,
        texto: string,
        autor: Usuario,
        legenda: string,
        data: Date, curtidas: number = 0
    ) {
        this.ValidarValor(id);
        this.ValidarValor(curtidas);
        this._id = id
        this._texto = texto
        this._autor = autor
        this._legenda = legenda
        this._data = data
        this._curtidas = curtidas
    }

    ValidarValor(valor: number): void {
        if (isNaN(valor) || valor < 0) {
            throw new ValorInvalido("Erro, um dos valores inseridos é inválido!!");
        }
    }

    curtir(): void {
        this._curtidas++;

    }

    descurtir(): void {
        this._curtidas--;
    }

    visualizar(): void {
        console.log(`ID: ${this._id}`)
        console.log(`Texto: ${this._texto}`)
        console.log(`Legenda: ${this.legenda}`)
        console.log(`Data: ${this._data.getDate()}/${this._data.getMonth() + 1}/${this._data.getFullYear()}`)
        console.log(`Autor: ${this._autor.nome}`)
    }

    get id(): number {
        return this._id
    }

    get texto(): string {
        return this._texto
    }

    get autor(): IAutenticavel {
        return this._autor
    }
    get curtidas(): number {
        return this._curtidas
    }

    get legenda(): string {
        return this._legenda
    }
    get data(): Date {
        return this._data
    }
}


class RedeSocial {
    private Armazena_dados: repo_post = new repo_post()
    constructor(
        private _id: number,
        private _nome: string,
        private _id_post: number = 1
    ) { }

    get nome(): string {
        return this._nome
    }

    get id(): number {
        return this._id
    }

    get id_post(): number {
        return this._id_post
    }

    ValidarValor(valor: number): void {
        if (isNaN(valor) || valor < 0) {
            throw new ValorInvalido("Erro, um dos valores inseridos é inválido!!");
        }
    }

    consultar_post(id: number): Post {
        this.ValidarValor(id)
        let post!: Post
        try {
            post = this.Armazena_dados.consultar(id).Valor
        } catch (e: any) {
            if (e instanceof Valor_inexistente) {
                throw new post_inexistente("Erro, o post não foi encontrado!!")
            }

        }
        return post
    }


    inserir_post(post: Post): void {
        this.Armazena_dados.inserir(post)
        this._id_post++;
    }

    alterar_post(novo_post: Post): void {
        this.ValidarValor(novo_post.id)
        this.Armazena_dados.alterar(novo_post)
    }

    excluir_post(id: number): void {
        this.ValidarValor(id)
        this.Armazena_dados.excluir(id)
    }

    curtir_post(id: number): void {
        this.ValidarValor(id)
        this.Armazena_dados.curtir(id)
    }

    descurtir_post(id: number): void {
        this.ValidarValor(id)
        this.Armazena_dados.descurtir(id)
    }

    visualizar_post(id: number): void {
        this.ValidarValor(id)
        this.Armazena_dados.visualizar(id)
    }

    visualizar_todos_os_posts(): void {
        this.Armazena_dados.visualizar_todos()
    }
}
