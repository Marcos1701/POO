interface Repositorio_Vetor<T> {
    vetor: T[]

    inserir(valor: T): void;
    consultar(id: number): RedeSocial;
    excluir(id: number): void;
}

interface Repositorio_encadeado<T> {
    inicio: No<T> | null

    inserir(valor: T): void;
    consultar(id: number): RedeSocial;
    excluir(id: number): void;
}

class Repo_vetor<T> implements Repositorio_Vetor<RedeSocial>{

    vetor: T[] = []

    consultar(id: number): T {
        for (let valor of this.vetor) {
            if (valor.id == id) {
                return valor
            }
        }
        throw new rede_social_inexistente("Erro, rede social inexistente!!!")
    }

    private consultar_index_valor(id: number): number {
        for (let i = 0; i < this.vetor.length; i++) {
            if (this.vetor[i].id == id) {
                return i
            }
        }
        throw new rede_social_inexistente("Erro, rede social inexistente!!!")
    }

    inserir(valor: T): void {
        this.consultar(valor.id)
        this.Redes_sociais.push(valor);
    }

    excluir(id: number): void {
        const index: number = this.consultar_index_rede_social(id_rede);

        for (let i = index; i < this.vetor.length; i++) {
            this.vetor[i] = this.vetor[i + 1]
        }
        this.vetor.push()
    }

}

class Repo_vetor_to_usuario extends Repo_vetor {
    inserir_novo_post(post: Post, id: number): void {
        const index: number = this.consultar_index_rede_social(id);
        this.vetor[index].inserir_post(post);
    }

    alterar_post(id_post: number, novo_txt: string, nova_legenda: string, id_rede: number): void {
        const index: number = this.consultar_index_rede_social(id_rede);
        this.vetor[index].alterar_post(id_post, novo_txt, nova_legenda);
    }

    excluir_post(id_post: number, id_rede: number): void {
        const index: number = this.consultar_index_rede_social(id_rede)
        this.vetor[index].excluir_post(id_post);
    }
}

class Repo_vetor_to_Rede_Social extends Repo_vetor {
    inserir_novo_post(post: Post, id: number): void {
        const index: number = this.consultar_index_rede_social(id);
        this.vetor[index].inserir_post(post);
    }

    alterar_post(id_post: number, novo_txt: string, nova_legenda: string, id_rede: number): void {
        const index: number = this.consultar_index_rede_social(id_rede);
        this.vetor[index].alterar_post(id_post, novo_txt, nova_legenda);
    }

    excluir_post(id_post: number, id_rede: number): void {
        const index: number = this.consultar_index_rede_social(id_rede)
        this.vetor[index].excluir_post(id_post);
    }
}


class No<T>{
    private _valor: T
    proximo: No<T> | null = null
    anterior: No<T> | null = null;

    constructor(valor: T) {
        this._valor = valor
    }
    get valor(): T {
        return this._valor
    }
}

class Repo_encadeado implements Repositorio_encadeado<RedeSocial> {
    inicio: No<RedeSocial> | null = null
    contador: number = 0

    consultar(id: number): No<RedeSocial> {

        let aux: No<RedeSocial> | null = this.inicio;
        while (aux) {
            if (aux.valor.id == id) {
                return aux;
            }
            aux = aux.proximo;
        }
        throw new rede_social_inexistente("Erro, rede social inexistente!!!");
    }

    inserir(valor: RedeSocial): void {
        try {
            this.consultar_rede_social(rede.id);
        } catch (e: any) {
            if (e instanceof rede_social_inexistente) {
                if (this.inicio) {
                    let aux: No<RedeSocial> | null = this.inicio;
                    while (aux) {
                        aux = aux.proximo;
                    }
                } else {
                    this.inicio = new No<RedeSocial>(rede);
                }
            } else {
                throw new rede_social_ja_existente("Erro, a rede social inserida já foi adicionada anteriormente!!!");
            }
        }

    }

    excluir(id_rede: number): void {

        if (this.inicio) { throw new rede_social_inexistente("Rede Social não encontrada!!!") };
        let aux: No<RedeSocial> = this.consultar_rede_social(id_rede);
        if (aux == this.inicio) {
            this.inicio = this.inicio.proximo;
        } else if (aux.anterior) {
            aux.anterior.proximo = aux.proximo;
            if (aux.proximo) {
                aux.proximo.anterior = aux.anterior;
            }
        }
    }

    inserir_novo_post(post: Post, id_rede: number): void {
        const rede: RedeSocial = this.consultar(id_rede);
        rete.inserir_post(post);
    }

    alterar_post(id_post: number, novo_txt: string, nova_legenda: string, id_rede: number): void {
        const rede: RedeSocial = this.consultar(id_rede);
        rede.alterar_post(id_post, novo_txt, nova_legenda);
    }

    excluir_post(id_post: number, id_rede: number): void {
        const rede: RedeSocial = this.consultar(id_rede)
        rede.excluir_post(id_post);
    }
}

import { RedeSocial, Post } from "./redes_sociais"
import { IAutenticavel, Usuario_V } from "./usuarios";
import { post_inexistente, post_ja_criado, ValorInvalido, login_invalido, rede_social_inexistente, rede_social_ja_existente } from "./trata_erros";
export { Repositorio_redes, Repo_vetor, Repo_encadeado }
