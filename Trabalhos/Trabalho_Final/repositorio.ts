import { RedeSocial, Post } from "./redes_sociais"
import { Usuario } from "./usuarios";
import {
    rede_social_inexistente, rede_social_ja_existente,
    Valor_inexistente, usuario_invalido,
    post_inexistente, erro_inesperado,
    post_ja_criado, usuario_inexistente,
    login_invalido, usuario_ja_criado,
    usuario_nao_logado
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

class lista_duplamente_encadeada<T> {
    _inicio: No<T> | null = null
    _fim: No<T> | null = this._inicio

    private no(valor: T): No<T> {
        return new No<T>(valor)
    }

    get inicio(): No<T> | null {
        return this._inicio
    }
    get fim(): No<T> | null {
        return this._fim
    }

    push(Valor: T): void {
        const no_valor: No<T> = this.no(Valor)
        if (this._inicio == null) {
            this._inicio = no_valor
        } else {
            no_valor.anterior = this._fim
            this._fim = no_valor
        }
    }

    pop(): T {
        if (this._inicio == null) {
            throw new Valor_inexistente("")
        }
        let aux: No<T> | null = this._inicio
        this._inicio = aux.proximo
        return aux.Valor
    }

    pop_valor(valor: T): void {
        let no_aux: No<T> | null = this._inicio
        if (no_aux == null) { throw new Valor_inexistente("") }
        if (no_aux.Valor == valor) {
            this._inicio = no_aux.proximo
        }

        while (no_aux) {
            if (no_aux.Valor == valor) {
                if (no_aux.anterior) {
                    no_aux.anterior.proximo = no_aux.proximo
                }
                if (no_aux.proximo) {
                    no_aux.proximo.anterior = no_aux.anterior
                }
                break
            }
        }
        if (this._fim && this._fim.Valor == valor) {
            this._fim = this._fim.anterior
        }
    }
    front(): T {
        if (this._inicio == null) { throw new Valor_inexistente("") }
        return this._inicio.Valor
    }


    isEmpty(): boolean {
        return (this._inicio == null)
    }

    size(): number {
        let aux: No<T> | null = this._inicio
        let cont: number = 0
        while (aux) {
            cont++
            aux = aux.proximo
        }
        return cont
    }

}


class repo_usuarios implements Repositorio_encadeado<Usuario>{
    lista_usuarios: lista_duplamente_encadeada<Usuario> = new lista_duplamente_encadeada<Usuario>()

    get inicio(): No<Usuario> | null {
        return this.lista_usuarios._inicio
    }

    get final(): No<Usuario> | null {
        return this.lista_usuarios._fim
    }

    consultar(id: number): No<Usuario> {
        let aux: No<Usuario> | null = this.lista_usuarios._inicio
        while (aux) {
            if (aux.Valor instanceof Usuario) {
                if (aux.Valor.id == id) {
                    return aux
                }
                aux = aux.proximo
            } else {
                break
            }
        }
        throw new usuario_inexistente("O usuario inserido não foi encontrado!!")
    }

    excluir(id: number): void {
        try {
            let usuario: Usuario = this.consultar(id).Valor
            this.lista_usuarios.pop_valor(usuario)
        } catch (e: any) {
            if (e instanceof Valor_inexistente) {
                throw new usuario_inexistente("O usuario inserido não foi encontrado!!")
            }
        }
    }


    consultar_conta(login: string): No<Usuario> {

        let aux: No<Usuario> | null = this.lista_usuarios.inicio
        while (aux) {
            if (aux.Valor.login == login) {
                return aux
            }
            aux = aux.proximo
        }
        throw new usuario_inexistente("Erro, usuário não encontrado!!!")
    }

    inserir(usuario: Usuario): void {
        try {
            if (usuario instanceof Usuario) {
                this.consultar(usuario.id)
                this.consultar_conta(usuario.login)
            } else {
                throw new usuario_invalido('Erro, o usuario inserido é inválido!!')
            }
        } catch (e: any) {
            if (e instanceof usuario_inexistente) {
                this.lista_usuarios.push(usuario)
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

    inserir_nova_rede(rede: RedeSocial, id_usuario: number): void {
        let no: No<Usuario> = this.consultar(id_usuario)
        no.Valor.inserir_rede_social(rede)
    }

    excluir_rede(id_rede: number, id_usuario: number): void {
        let no: No<Usuario> = this.consultar(id_usuario)
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
        return this.lista_usuarios.size()
    }
}

class repo_redes_sociais implements Repositorio_encadeado<RedeSocial> {
    private _redes_sociais: lista_duplamente_encadeada<RedeSocial> = new lista_duplamente_encadeada<RedeSocial>()


    get inicio(): No<RedeSocial> | null {
        return this._redes_sociais.inicio
    }

    consultar_rede(id: number, nome: string): No<RedeSocial> {

        let no_aux: No<RedeSocial> | null = this._redes_sociais._inicio
        while (no_aux) {
            if (no_aux.Valor.id == id || no_aux.Valor.nome == nome) {
                return no_aux
            }
            no_aux = no_aux.proximo
        }
        throw new rede_social_inexistente("Erro, rede social não encontrada!!!")
    }

    inserir(rede_social: RedeSocial): void {
        try {
            this.consultar_rede(rede_social.id, rede_social.nome)
        } catch (e: any) {
            if (e instanceof rede_social_inexistente) {
                this._redes_sociais.push(rede_social)
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
        let no: No<RedeSocial> | null = this._redes_sociais._inicio

        while (no) {
            if (no.Valor.id == id) {
                return no
            }
        }

        throw new rede_social_inexistente("Erro, Rede Social não encontrada!!!")
    }

    excluir(id: number): void {
        try {
            this._redes_sociais.pop_valor(this.consultar(id).Valor)
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

class repo_post implements Repositorio_encadeado<Post>{
    private _posts: lista_duplamente_encadeada<Post> = new lista_duplamente_encadeada<Post>()

    get inicio(): No<Post> | null {
        return this._posts.inicio
    }
    consultar(id: number): No<Post> {
        let no: No<Post> | null = this._posts._inicio

        while (no) {
            if (no.Valor.id == id) {
                return no
            }
        }
        throw new post_inexistente("Erro, Post não encontrado!!!")
    }

    inserir(valor: Post): void {
        try {
            this.consultar(valor.id)
        } catch (e: any) {
            if (e instanceof post_inexistente) {
                this._posts.push(valor)
            } else {
                throw new post_ja_criado("Erro, o post inserido já foi adicionado anteriormente!!!")
            }
        }
    }

    excluir(id: number): void {
        try {
            let post: Post = this.consultar(id).Valor
            this._posts.pop_valor(post)
        } catch (e: any) {
            if (e instanceof post_inexistente) {
                throw e
            } else {
                throw new erro_inesperado("ops, um erro inesperado ocorreu!!")
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
    private _usuario_logado: Usuario | null = null

    inserir_usuario(usuario: Usuario): void {
        if (usuario instanceof Usuario) {
            this.armazena_usuarios.inserir(usuario)
        } else {
            throw new erro_inesperado("Ops, um erro inesperado ocorreu...")
        }
    }

    logado(): boolean {
        return (this._usuario_logado == null)
    }

    get usuario_logado(): Usuario {
        if (this._usuario_logado == null) { throw new usuario_nao_logado("Erro, não há nenhum usuário logado!!!") }
        return this._usuario_logado
    }

    deslogar_usuario(): void {
        if (this._usuario_logado == null) { throw new usuario_nao_logado("Erro, não há nenhum usuário logado!!!") }
        this._usuario_logado = null
    }

    inserir_rede(rede: RedeSocial): void {
        if (rede instanceof RedeSocial) {
            this.armazena_redes.inserir(rede)
        } else {
            throw new erro_inesperado("Ops, um erro inesperado ocorreu...")
        }
    }

    inserir_rede_social_em_usuario(id_rede: number): void {
        if (this._usuario_logado == null) { throw new usuario_nao_logado("Erro, você não está logado!!!") }
        this.armazena_usuarios.inserir_nova_rede(this.armazena_redes.consultar(id_rede).Valor, this._usuario_logado.id)
    }

    excluir_rede_de_um_usuario(id_rede: number): void {
        if (this._usuario_logado == null) { throw new usuario_nao_logado("Erro, você não está logado!!!") }
        this.armazena_usuarios.excluir_rede(id_rede, this._usuario_logado.id)
    }

    exibir_redes_sociais_do_usuario(): void {
        if (this._usuario_logado == null) { throw new usuario_nao_logado("Erro, você não está logado!!!") }
        this._usuario_logado.exibir_redes_sociais()
    }

    consultar_rede_do_usuario(id_rede: number): RedeSocial {
        if (this._usuario_logado == null) { throw new usuario_nao_logado("Erro, você não está logado!!!") }
        return this._usuario_logado.consultar_rede_social(id_rede)
    }

    inserir_post(id_rede: number, post: Post): void {
        if (this._usuario_logado == null) { throw new usuario_nao_logado("Erro, você não está logado!!!") }
        this.armazena_usuarios.inserir_novo_post(post, id_rede, this._usuario_logado.id)
    }

    excluir_post(id_rede: number, id_post: number): void {
        if (this._usuario_logado == null) { throw new usuario_nao_logado("Erro, você não está logado!!!") }
        this.armazena_usuarios.excluir_post(id_post, id_rede, this._usuario_logado.id)
    }

    curtir_post(id_rede: number, id_post: number): void {
        if (this._usuario_logado == null) { throw new usuario_nao_logado("Erro, você não está logado!!!") }
        this.armazena_usuarios.curtir_post(id_post, id_rede, this._usuario_logado.id)
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

    visualizar_post(id_rede: number, id_post: number): void {
        if (this._usuario_logado == null) { throw new usuario_nao_logado("Erro, você não está logado!!!") }
        this.armazena_usuarios.visualizar_post(id_post, id_rede, this._usuario_logado.id)
    }

    visualizar_posts_de_rede_social(id_rede: number): void {
        if (this._usuario_logado == null) { throw new usuario_nao_logado("Erro, você não está logado!!!") }
        this.armazena_usuarios.visualizar_posts_de_rede_social(id_rede, this._usuario_logado.id)
    }
    autenticar_usuario(login: string, senha: string): void {
        if (this.armazena_usuarios.autenticar(login, senha)) {
            this._usuario_logado = this.armazena_usuarios.consultar_conta(login).Valor
        }
    }

    alterar_post(novo_post: Post, id_rede: number): void {
        if (this._usuario_logado == null) { throw new usuario_nao_logado("Erro, você não está logado!!!") }
        this.armazena_usuarios.alterar_post(novo_post, id_rede, this._usuario_logado.id)
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

