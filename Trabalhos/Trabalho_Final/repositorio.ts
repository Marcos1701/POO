import { RedeSocial, Post } from "./redes_sociais"
import { Usuario } from "./usuarios";
import {
    rede_social_inexistente, rede_social_ja_existente,
    Valor_inexistente, ValorInvalido,
    post_inexistente, erro_inesperado,
    post_ja_criado, usuario_inexistente,
    login_invalido, usuario_ja_criado
} from "./trata_erros";
export { Dados_Aplicacao, No, repo_redes_sociais as repo_rede_social, repo_post }

interface Repositorio_encadeado<T> {
    inserir(valor: T): void;
    consultar(id: number): No<T>;
    excluir(id: number): void;
}


class No<T>{
    Valor: T
    proximo: No<T> | null = null
    anterior: No<T> | null = null;

    constructor(valor: T) {
        this.Valor = valor
    }

}

class Repo_encadeado<T> implements Repositorio_encadeado<T> {
    private _inicio: No<T> | null = null
    private _fim: No<T> | null = this._inicio

    get inicio(): No<T> | null {
        return this._inicio
    }

    get final(): No<T> | null {
        return this._fim
    }

    consultar(id: number): No<T> {

        let aux: No<T> | null = this._inicio

        while (aux) {
            if (aux.Valor instanceof Usuario || aux.Valor instanceof RedeSocial || aux.Valor instanceof Post) {
                if (aux.Valor.id == id) {
                    return aux
                }
                aux = aux.proximo
            } else {
                break
            }
        }
        throw new Valor_inexistente("")
    }

    inserir(valor: T): void {
        try {
            if (valor instanceof Usuario || valor instanceof RedeSocial || valor instanceof Post) {
                this.consultar(valor.id)
            } else {
                throw new ValorInvalido('Erro!!')
            }
        } catch (e: any) {
            if (e instanceof Valor_inexistente) {
                if (this._inicio == null) {
                    this._inicio = new No<T>(valor)
                } else {
                    let aux: No<T> = new No<T>(valor)
                    aux.anterior = this._fim
                    this._fim = aux
                }
            } else {
                throw new ValorInvalido("Erro!!")
            }
        }

    }

    excluir(id: number): void {

        if (this._inicio == null) { throw new Valor_inexistente("") }
        let aux: No<T> | null = this.consultar(id)
        if (aux == this._inicio) {
            this._inicio = aux.proximo

        } else if (aux.anterior) {
            aux.anterior.proximo = aux.proximo
            if (aux.proximo) {
                aux.proximo.anterior = aux.anterior
            }
        }

        if (aux == this._fim) {
            this._fim = this._fim.anterior
        }
    }
}

class repo_usuarios {
    private _usuarios: Repo_encadeado<Usuario> = new Repo_encadeado<Usuario>()
    private _qtd_usuarios: number = 0

    get inicio(): No<Usuario> | null {
        return this._usuarios.inicio
    }


    consultar_conta(login: string): No<Usuario> {

        let aux: No<Usuario> | null = this._usuarios.inicio
        while (aux) {
            if (aux.Valor.login == login) {
                return aux
            }
            aux = aux.proximo
        }
        throw new usuario_inexistente("Erro, usuário não encontrado!!!")
    }

    inserir_usuario(usuario: Usuario): void {
        try {
            this.consultar_conta(usuario.login)
        } catch (e: any) {
            if (e instanceof usuario_inexistente) {
                this._usuarios.inserir(usuario)
                this._qtd_usuarios++
            } else {
                throw new usuario_ja_criado("Erro, o login inserido já foi utilizado por outro usuário!!")
            }
        }
    }
    autenticar(login: string, senha: string): Usuario {
        let usuario: Usuario = this.consultar_conta(login).Valor
        if (usuario.senha != senha) {
            throw new login_invalido("Erro, login ou senha inválidos!!!")
        }
        return usuario
    }

    consultar(id: number): No<Usuario> {
        let no!: No<Usuario>
        try {
            no = this._usuarios.consultar(id)
        } catch (e: any) {
            if (e instanceof Valor_inexistente) {
                throw new usuario_inexistente("Erro, Usuário não encontrado!!!")
            }
        }
        if (no == null) { throw new usuario_inexistente("Erro, Usuário não encontrado!!!") }
        return no
    }

    excluir(id: number): void {
        try {
            this._usuarios.excluir(id)
            this._qtd_usuarios--
        } catch (e: any) {
            if (e instanceof Valor_inexistente) {
                throw new usuario_inexistente("Erro, Usuário não encontrado!!!")
            }
        }
    }

    inserir_nova_rede(rede: RedeSocial, id_usuario: number): void {
        let no: No<Usuario> = this._usuarios.consultar(id_usuario)
        no.Valor.inserir_rede_social(rede)
    }

    excluir_rede(id_rede: number, id_usuario: number): void {
        let no: No<Usuario> = this._usuarios.consultar(id_usuario)
        no.Valor.excluir_rede_social(id_rede)
    }

    inserir_novo_post(post: Post, id_rede: number, id_usuario: number): void {
        this.consultar(id_usuario).Valor.inserir_novo_post(post, id_rede)
    }

    excluir_post(id_post: number, id_rede: number, id_usuario: number): void {
        this.consultar(id_usuario).Valor.excluir_post(id_post, id_rede)
    }

    curtir_post(id_post: number, id_rede: number, id_usuario: number): void {
        try {
            this.consultar(id_usuario).Valor.curtir_post(id_rede, id_post)
        } catch (e: any) {
            if (e instanceof post_inexistente) {
                throw new post_inexistente("Erro, Post não encontrado!!!")
            }
        }
    }


    descurtir_post(id_post: number, id_rede: number, id_usuario: number): void {
        try {
            this.consultar(id_usuario).Valor.descurtir_post(id_rede, id_post)
        } catch (e: any) {
            if (e instanceof post_inexistente) {
                throw new post_inexistente("Erro, Post não encontrado!!!")
            }
        }
    }

    alterar_post(novo_post: Post, id_rede: number, id_usuario: number): void {
        this.consultar(id_usuario).Valor.alterar_post(novo_post, id_rede)
    }

    visualizar_post(id_post: number, id_rede: number, id_usuario: number): void {
        const usuario: Usuario = this.consultar(id_usuario).Valor
        const rede: RedeSocial = usuario.consultar_rede_social(id_rede)
        rede.visualizar_post(id_post)
    }

    visualizar_posts_de_rede_social(id_rede: number, id_usuario: number): void {
        const usuario: Usuario = this.consultar(id_usuario).Valor
        const rede: RedeSocial = usuario.consultar_rede_social(id_rede)
        rede.visualizar_todos_os_posts()
    }


    get qtd(): number {
        return this._qtd_usuarios
    }
}

class repo_redes_sociais {
    private _redes_sociais: Repo_encadeado<RedeSocial> = new Repo_encadeado<RedeSocial>()

    get inicio(): No<RedeSocial> | null {
        return this._redes_sociais.inicio
    }
    consultar_rede(id: number, nome: string): No<RedeSocial> {

        let no_aux: No<RedeSocial> | null = this._redes_sociais.inicio
        while (no_aux) {
            if (no_aux.Valor.id == id || no_aux.Valor.nome == nome) {
                return no_aux
            }
            no_aux = no_aux.proximo
        }
        throw new rede_social_inexistente("Erro, rede social não encontrada!!!")
    }

    inserir_rede(rede_social: RedeSocial): void {
        try {
            this.consultar_rede(rede_social.id, rede_social.nome)
        } catch (e: any) {
            if (e instanceof rede_social_inexistente) {
                this._redes_sociais.inserir(rede_social)
            } else {
                throw new rede_social_ja_existente("Erro, a rede social já foi inserida anteriormente!!")
            }
        }
    }

    exibir_redes(): void {
        if (this._redes_sociais.inicio == null) throw new rede_social_inexistente("Erro, não há redes sociais cadastradas!!")
        let no_aux: No<RedeSocial> | null = this._redes_sociais.inicio
        console.log("Redes Sociais Cadastradas:\n")
        console.log("ID - nome da Rede Social")
        while (no_aux) {
            console.log(`${no_aux.Valor.id} - ${no_aux.Valor.nome}`)
            no_aux = no_aux.proximo
        }
    }

    consultar(id: number): No<RedeSocial> {
        let no!: No<RedeSocial>
        try {
            no = this._redes_sociais.consultar(id)
        } catch (e: any) {
            if (e instanceof Valor_inexistente) {
                throw new rede_social_inexistente("Erro, Rede Social não encontrada!!!")
            }
        }
        if (no == null) { throw new rede_social_inexistente("Erro, Rede Social não encontrada!!!") }
        return no
    }

    inserir(valor: RedeSocial): void {
        try {
            this._redes_sociais.consultar(valor.id)
        } catch (e: any) {
            if (e instanceof rede_social_inexistente) {
                this._redes_sociais.inserir(valor)
            } else {
                throw new rede_social_ja_existente("Erro, a rede social inserida já foi adicionada anteriormente!!!")
            }
        }
    }

    excluir(id: number): void {
        try {
            this._redes_sociais.excluir(id)
        } catch (e: any) {
            if (e instanceof Valor_inexistente) {
                throw new rede_social_inexistente("Erro, Rede Social não encontrada!!!")
            }
        }
    }


    inserir_novo_post(post: Post, id: number): void {
        let aux: No<RedeSocial> = this.consultar(id)
        aux.Valor.inserir_post(post)
    }

    excluir_post(id_post: number, id: number): void {
        let aux: No<RedeSocial> = this.consultar(id)
        aux.Valor.excluir_post(id_post)
    }

    curtir_post(id_post: number, id: number): void {
        try {
            let aux: No<RedeSocial> = this.consultar(id)
            aux.Valor.curtir_post(id_post)
        } catch (e: any) {
            if (e instanceof post_inexistente) {
                throw new post_inexistente("Erro, Post não encontrado!!!")
            }
        }
    }

    descurtir_post(id_post: number, id: number): void {
        try {
            let aux: No<RedeSocial> = this.consultar(id)
            aux.Valor.descurtir_post(id_post)
        } catch (e: any) {
            if (e instanceof post_inexistente) {
                throw new post_inexistente("Erro, Post não encontrado!!!")
            }
        }
    }

    visualizar_post(id_post: number, id: number): void {
        try {
            let aux: No<RedeSocial> = this.consultar(id)
            aux.Valor.visualizar_post(id_post)
        } catch (e: any) {
            if (e instanceof post_inexistente) {
                throw new post_inexistente("Erro, Post não encontrado!!!")
            }
        }
    }

    alterar_post(id: number, post: Post): void {
        try {
            let aux: No<RedeSocial> = this.consultar(id)
            aux.Valor.alterar_post(post)
        } catch (e: any) {
            if (e instanceof post_inexistente) {
                throw new post_inexistente("Erro, Post não encontrado!!!")
            }
        }
    }

    visualizar_todos_os_posts(id: number): void {
        let aux: No<RedeSocial> = this.consultar(id)
        aux.Valor.visualizar_todos_os_posts()
    }

}

class repo_post {
    private _posts: Repo_encadeado<Post> = new Repo_encadeado<Post>()

    get inicio(): No<Post> | null {
        return this._posts.inicio
    }
    consultar(id: number): No<Post> {
        let no!: No<Post>
        try {
            no = this._posts.consultar(id)
        } catch (e: any) {
            if (e instanceof Valor_inexistente) {
                throw new post_inexistente("Erro, Post não encontrado!!!")
            }
        }
        if (no == null) { throw new post_inexistente("Erro, Post não encontrado!!!") }
        return no
    }

    inserir(valor: Post): void {
        try {
            this.consultar(valor.id)
        } catch (e: any) {
            if (e instanceof post_inexistente) {
                this._posts.inserir(valor)
            } else {
                throw new post_ja_criado("Erro, o post inserido já foi adicionado anteriormente!!!")
            }
        }
    }

    excluir(id: number): void {
        try {
            this._posts.excluir(id)
        } catch (e: any) {
            if (e instanceof Valor_inexistente) {
                throw new post_inexistente("Erro, Post não encontrado!!!")
            }
        }
    }

    curtir(id: number): void {
        let aux: No<Post> = this.consultar(id)
        aux.Valor.curtir()
    }

    descurtir(id: number): void {
        let aux: No<Post> = this.consultar(id)
        aux.Valor.descurtir()
    }

    visualizar(id: number): void {
        let aux: No<Post> = this.consultar(id)
        aux.Valor.visualizar()
    }

    alterar(post: Post): void {
        let aux: No<Post> = this.consultar(post.id)
        aux.Valor = post
    }

    visualizar_todos(): void {
        if (this._posts.inicio == null) throw new post_inexistente("Erro, não há posts cadastrados!!!")
        let aux: No<Post> = this._posts.inicio
        while (aux.proximo) {
            aux.Valor.visualizar()
            aux = aux.proximo
        }
    }

}


class Dados_Aplicacao {
    private armazena_usuarios: repo_usuarios = new repo_usuarios();
    private armazena_redes: repo_redes_sociais = new repo_redes_sociais();

    inserir_usuario(usuario: Usuario): void {
        if (usuario instanceof Usuario) {
            this.armazena_usuarios.inserir_usuario(usuario)
        } else {
            throw new erro_inesperado("Ops, um erro inesperado ocorreu...")
        }
    }

    inserir_rede(rede: RedeSocial): void {
        if (rede instanceof RedeSocial) {
            this.armazena_redes.inserir_rede(rede)
        } else {
            throw new erro_inesperado("Ops, um erro inesperado ocorreu...")
        }
    }

    inserir_rede_social_em_usuario(id_usuario: number, id_rede: number): void {
        this.armazena_usuarios.inserir_nova_rede(this.armazena_redes.consultar(id_rede).Valor, id_usuario)
    }

    excluir_rede_de_um_usuario(id_usuario: number, id_rede: number): void {
        this.armazena_usuarios.excluir_rede(id_rede, id_usuario)
    }

    inserir_post(id_usuario: number, id_rede: number, post: Post): void {
        this.armazena_usuarios.inserir_novo_post(post, id_rede, id_usuario)
    }

    excluir_post(id_usuario: number, id_rede: number, id_post: number): void {
        this.armazena_usuarios.excluir_post(id_post, id_rede, id_usuario)
    }

    curtir_post(id_usuario: number, id_rede: number, id_post: number): void {
        this.armazena_usuarios.curtir_post(id_post, id_rede, id_usuario)
    }

    consultar_usuario(id: number): Usuario {
        return this.armazena_usuarios.consultar(id).Valor
    }

    consultar_rede_social(id: number): RedeSocial {
        const rede: RedeSocial = this.armazena_redes.consultar(id).Valor
        return rede
    }

    excluir_usuario(id: number): void {
        this.armazena_usuarios.excluir(id);
    }

    excluir_rede_social(id: number): void {
        this.armazena_redes.excluir(id);
    }

    exibir_redes_sociais_disponiveis(): void {
        this.armazena_redes.exibir_redes()
    }

    visualizar_post(id_rede: number, id_post: number, id_usuario: number): void {
        this.armazena_usuarios.visualizar_post(id_post, id_rede, id_usuario)
    }

    visualizar_posts_de_rede_social(id_rede: number, id_usuario: number): void {
        this.armazena_usuarios.visualizar_posts_de_rede_social(id_rede, id_usuario)
    }
    autenticar_usuario(login: string, senha: string): Usuario {
        return this.armazena_usuarios.autenticar(login, senha)
    }

    alterar_post(id_usuario: number, novo_post: Post, id_rede: number): void {
        this.armazena_usuarios.alterar_post(novo_post, id_rede, id_usuario)
    }


    qtd_usuarios(): number {
        const qtd: number = this.armazena_usuarios.qtd
        return qtd
    }

    qtd_redes(): number {
        let aux: No<RedeSocial> | null = this.armazena_redes.inicio
        let qtd: number = 0
        if (!aux) { return qtd }

        while (aux) {
            qtd++
            aux = aux.proximo
        }
        return qtd
    }

}

