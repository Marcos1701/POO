
class Post {
    constructor(
        private _id: string,
        private _texto: string,
        private _autor: IAutenticavel,
        private _curtidas: number,
        private _legenda: string,
        private _data: Date
    ) { }

    curtir(): void {
        this._curtidas++;
    }

    get id(): string {
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
        private _id: string,
        private _nome: string,
    ) { }

    get nome(): string {
        return this._nome
    }

    get id(): string {
        return this._id
    }

    consultar_post(id: string): Post {
        for (let post of this.Posts) {
            if (post.id == id) {
                return post
            }
        }
        throw new post_inexistente("Post não encontrado")
    }

    private consultar_index_post(id: string): number {
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

    alterar_post(id: string, texto: string, legenda: string): void {
        const index = this.consultar_index_post(id)
        const post: Post = new Post(id, texto, this.Posts[index].autor, this.Posts[index].curtidas, legenda, new Date())
        this.Posts[index] = post
    }

    excluir_post(id: string): void {
        const index = this.consultar_index_post(id)
        for (let i = index; i < this.Posts.length; i++) {
            this.Posts[i] = this.Posts[i + 1]
        }
        this.Posts.push()
    }

    curtir_post(id: string, usuario: IAutenticavel) {
        const index = this.consultar_index_post(id)
        this.Posts[index].curtir();
    }

    // consultar_post_por_autor(autor: IAutenticavel): Post[] {
    //     const posts: Post[] = []
    //     for (let post of this.Posts) {
    //         if (post.autor == autor) {
    //             posts.push(post)
    //         }
    //     }
    //     return posts
    // }

}

import { IAutenticavel, Usuario } from "./usuarios";
import { post_invalido, post_inexistente, post_ja_criado } from "./trata_erros";
export { RedeSocial, Post }