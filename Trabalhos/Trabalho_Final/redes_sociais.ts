
class Post {
    private _id: number
    private _texto: string
    private _autor: IAutenticavel
    private _curtidas: number
    private _legenda: string
    private _data: Date
    private Usuarios_que_curtiram: Usuario_V[] = []

    constructor(
        id: number,
        texto: string,
        autor: IAutenticavel,
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
    curtir(usuario: Usuario_V): void {
        if (usuario instanceof Usuario_V) {
            this._curtidas++;
            this.Usuarios_que_curtiram.push(usuario)
        }

    }

    exibir_usuarios_que_curtiram(): void {
        for (let usuario of this.Usuarios_que_curtiram) {
            console.log(`Nome: ${usuario.nome}\nidade: ${usuario.idade}`)
        }
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
    private Posts: Post[] = []
    constructor(
        private _id: number,
        private _nome: string,
    ) { }

    get nome(): string {
        return this._nome
    }

    get id(): number {
        return this._id
    }

    consultar_post(id: number): Post {
        for (let post of this.Posts) {
            if (post.id == id) {
                return post
            }
        }
        throw new post_inexistente("Post não encontrado")
    }

    private consultar_index_post(id: number): number {
        for (let i = 0; i < this.Posts.length; i++) {
            if (this.Posts[i].id == id) {
                return i
            }
        }
        throw new post_inexistente("Post não encontrado")
    }

    inserir_post(post: Post): void {
        try {
            this.consultar_post(post.id);
        } catch (e: any) {
            if (!(e instanceof post_inexistente)) {
                throw new post_ja_criado("Erro, esse post já foi inserido!!")
            }
            this.Posts.push(post)
        }
    }

    alterar_post(id: number, texto: string, legenda: string): void {
        const index = this.consultar_index_post(id)
        const post: Post = new Post(id, texto, this.Posts[index].autor, legenda, new Date(), this.Posts[index].curtidas)
        this.Posts[index] = post
    }

    excluir_post(id: number): void {
        const index = this.consultar_index_post(id)
        for (let i = index; i < this.Posts.length; i++) {
            this.Posts[i] = this.Posts[i + 1]
        }
        this.Posts.push()
    }

    curtir_post(id: number, usuario: Usuario_V) {
        const index = this.consultar_index_post(id)
        this.Posts[index].curtir(usuario);
    }

}

import { IAutenticavel, Usuario_V } from "./usuarios";
import { post_inexistente, post_ja_criado, ValorInvalido } from "./trata_erros";
export { RedeSocial, Post }
