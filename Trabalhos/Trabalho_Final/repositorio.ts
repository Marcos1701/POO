interface Repositorio_Vetor {
    Redes_sociais: RedeSocial[]

    inserir_rede_social(rede: RedeSocial): void;
    consultar_rede_social(id: number): RedeSocial;
    excluir_rede_social(id_rede: number): void;
    excluir_post(id_post: number, id_rede: number): void
    alterar_post(id_post: number, novo_txt: string, nova_legenda: string, id_rede: number): void
    inserir_novo_post(post: Post, id_rede: number): void

}

interface Repositorio_encadeado<T> {
    inicio: No<T> | null

    inserir(valor: T): void;
    consultar(id: number): RedeSocial;
    excluir(id: number): void;
    excluir(id_post: number, id_rede: number): void
    alterar(id_post: number, novo_txt: string, nova_legenda: string, id_rede: number): void
    inserir(post: Post, id_rede: number): void

}

class Repo_vetor implements Repositorio_Vetor {

    Redes_sociais: RedeSocial[] = []

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
}


class No<T>{
    private _Valor: T
    proximo: No<T> | null = null
    anterior: No<T> | null = null;

    constructor(valor: T) {
        this._Valor = valor
    }
    get Valor(): T {
        return this._Valor
    }
}

class Repo_encadeado implements Repositorio_encadeado<RedeSocial> {
    inicio: No<RedeSocial> | null = null
    contador: number = 0

    consultar_rede_social(id: number): No<RedeSocial> {

        let aux: No<RedeSocial> | null = this.inicio
        while (aux) {
            if (aux.Valor.id == id) {
                return aux
            }
            aux = aux.proximo
        }
        throw new rede_social_inexistente("Erro, rede social inexistente!!!")
    }

    // private consultar_index_rede_social(id: number): number {

    //     throw new rede_social_inexistente("Erro, rede social inexistente!!!")
    // }

    inserir_rede_social(rede: RedeSocial): void {
        try {
            this.consultar_rede_social(rede.id)
        } catch (e: any) {
            if (e instanceof rede_social_inexistente) {
                if (this.inicio) {
                    let aux: No<RedeSocial> | null = this.inicio
                    while (aux) {
                        aux = aux.proximo;
                    }
                } else {
                    this.inicio = new No<RedeSocial>(rede)
                }
            } else {
                throw new rede_social_ja_existente("Erro, a rede social inserida já foi adicionada anteriormente!!!")
            }
        }

    }

    excluir_rede_social(id_rede: number): void {

        if (this.inicio) { throw new rede_social_inexistente("Rede Social não encontrada!!!") }
        let aux: No<RedeSocial> = this.consultar_rede_social(id_rede)
        if (aux == this.inicio) {
            this.inicio = this.inicio.proximo
        } else if (aux.anterior) {
            aux.anterior.proximo = aux.proximo
            if (aux.proximo) {
                aux.proximo.anterior = aux.anterior
            }
        }
    }

    inserir_novo_post(post: Post, id_rede: number): void {

    }

    alterar_post(id_post: number, novo_txt: string, nova_legenda: string, id_rede: number): void {
        //this.Redes_sociais[index].alterar_post(id_post, novo_txt, nova_legenda);
    }

    excluir_post(id_post: number, id_rede: number): void {
        //this.Redes_sociais[index].excluir_post(id_post);
    }
}

import { RedeSocial, Post } from "./redes_sociais"
import { IAutenticavel, Usuario_V } from "./usuarios";
import { post_inexistente, post_ja_criado, ValorInvalido, login_invalido, rede_social_inexistente, rede_social_ja_existente } from "./trata_erros";
export { Repositorio_redes, Repo_vetor, Repo_encadeado }
