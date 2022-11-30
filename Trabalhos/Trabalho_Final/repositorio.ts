interface Repositorio_redes{
    Redes_sociais: RedeSocial[]

    inserir_rede_social(rede: RedeSocial): void;
    consultar_rede_social(id: number): RedeSocial;
    excluir_rede_social(id_rede: number):void;
    excluir_post(id_post: number, id_rede: number): void
    alterar_post(id_post: number, novo_txt: string, nova_legenda: string, id_rede: number): void 
    inserir_novo_post(post: Post, id_rede: number): void 
    
}

class Repo_vetor implements Repositorio_redes{
    
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

class Repo_encadeado implements Repositorio_redes{
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

import { RedeSocial, Post } from "./redes_sociais"
import { IAutenticavel, Usuario_V } from "./usuarios";

export {Repositorio_redes, Repo_vetor, Repo_encadeado}
