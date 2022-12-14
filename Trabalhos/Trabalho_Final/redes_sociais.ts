import { Usuario } from "./usuarios";
import { post_inexistente, usuario_inexistente, ValorInvalido, Valor_inexistente } from "./trata_erros";
import { repo_post, No } from './repositorio'
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

    visualizar(): void {
        console.log(`ID: ${this._id}`)
        console.log(`Texto: ${this._texto}`)
        console.log(`Legenda: ${this.legenda}`)
        console.log(`Data: ${this._data.getDate()}/${this._data.getMonth() + 1}/${this._data.getFullYear()}`)
        console.log(`Autor: ${this._autor.nome}`)
        console.log(`Curtidas: ${this._curtidas} curtidas\n`)
    }

    get id(): number {
        return this._id
    }

    get texto(): string {
        return this._texto
    }

    get autor(): Usuario {
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
    private posts: repo_post = new repo_post()
    usuarios_da_rede: Usuario[] = []
    constructor(
        private _id: number,
        private _nome: string,
        private _url: string,
        private _id_post: number = 1
    ) { }

    get nome(): string {
        return this._nome
    }

    get url(): string {
        return this._url
    }

    get id(): number {
        return this._id
    }

    get id_post(): number {
        return this._id_post
    }

    consultar_usuario(id: number): Usuario {
        let usuario !: Usuario
        for (let i = 0; i < this.usuarios_da_rede.length; i++) {
            if (this.usuarios_da_rede[i].id == id) {
                usuario = this.usuarios_da_rede[i]
            }
        }
        if (usuario == null) { throw new usuario_inexistente("Usuario não encontrado!!") }
        return usuario
    }

    private consultar_index_usuario(id: number): number {
        let index: number = -1
        for (let i = 0; i < this.usuarios_da_rede.length; i++) {
            if (this.usuarios_da_rede[i].id == id) {
                index = i
            }
        }
        if (index == -1) { throw new usuario_inexistente("Usuario não encontrado!!") }
        return index
    }

    inserir_usuario(usuario: Usuario): void {
        this.usuarios_da_rede.push(usuario)
    }

    qtd_posts(): number {
        let qtd: number = this.posts.qtd()
        return qtd
    }

    excluir_usuario(id: number): void {
        let index: number = this.consultar_index_usuario(id)
        for (let i = index; i < this.usuarios_da_rede.length; i++) {
            this.usuarios_da_rede[i] = this.usuarios_da_rede[i + 1]
        }
        this.usuarios_da_rede.pop()
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
            post = this.posts.consultar(id).Valor
        } catch (e: any) {
            if (e instanceof Valor_inexistente) {
                throw new post_inexistente("Erro, o post não foi encontrado!!")
            }
        }
        return post
    }

    ids_posts(): number[] {
        let ids: number[] = []
        let no_aux: No<Post> | null = this.posts.inicio

        while (no_aux) {
            ids.push(no_aux.Valor.id)
        }

        if (ids.length == 0) { throw new post_inexistente("Não há posts cadastrados!!") }
        return ids
    }


    inserir_post(post: Post): void {
        this.posts.inserir(post)
        this._id_post++;
    }

    alterar_post(novo_post: Post): void {
        this.ValidarValor(novo_post.id)
        this.posts.alterar(novo_post)
    }

    excluir_post(id: number): void {
        this.ValidarValor(id)
        this.posts.excluir(id)
    }

    curtir_post(id_post: number): void {
        this.ValidarValor(id_post)
        this.posts.curtir(id_post)
    }

    visualizar_post(id: number): void {
        this.ValidarValor(id)
        this.posts.visualizar(id)
    }

    visualizar_todos_os_posts(): void {
        this.posts.visualizar_todos()
    }
}
