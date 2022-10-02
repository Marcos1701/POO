class Postagem {
    id: number
    texto: string
    qtd_curtidas: number

    constructor(id: number, text: string) {
        this.id = id
        this.texto = text
        this.qtd_curtidas = 0
    }

    curtir(): void {
        this.qtd_curtidas++
    }

    toString(): string {
        let aux: string = `
        id Postagem: ${this.id}
        Quantidade de curtidas: ${this.qtd_curtidas}
        texto inserido: ${this.texto}
        `
        return aux
    }
}

class microBlog {
    Postagens: Postagem[] = []

    inserir(postagem: Postagem) {
        if (this.consultar_index_postagem(postagem.id) == -1) {
            this.Postagens.push(postagem)
        } else {
            console.log("Postagem já existe!!")
        }
    }

    curtir_postagem(id: number) {
        let index: number = this.consultar_index_postagem(id)

        if (index != -1) {
            this.Postagens[index].curtir()
        }
    }

    consultar_index_postagem(id: number): number {
        let index: number = -1

        for (let i = 0; i < this.Postagens.length; i++) {
            if (this.Postagens[i].id == id) {
                index = i
                break
            }
        }

        return index
    }

    excluir_p(id: number): void {
        let index: number = this.consultar_index_postagem(id)

        if (index != -1) {
            for (let i = index; i < this.Postagens.length; i++) {
                this.Postagens[i] = this.Postagens[i + 1]
            }
            this.Postagens.pop()
        }
        return
    }


    postagem_mais_curtida(): Postagem {
        let postagem_com_mais_curti!: Postagem
        let maior_qtd_curtidas: number = 0

        for (let postagem of this.Postagens) {
            if (postagem.qtd_curtidas > maior_qtd_curtidas) {
                postagem_com_mais_curti = postagem
                maior_qtd_curtidas = postagem.qtd_curtidas
            }
        }

        return postagem_com_mais_curti
    }

    toString_geral(): string {
        let aux: string = ''

        for (let postagem of this.Postagens) {
            aux += postagem.toString()
        }

        return aux
    }
}

let micro_b: microBlog = new microBlog()
let postagem_t!: Postagem
micro_b.inserir(new Postagem(1, 'Olá, Tudo bem?'))
micro_b.inserir(new Postagem(2, 'Olá, Tudo bem com vc?'))
micro_b.inserir(new Postagem(3, 'Olá, Tudo bem com voce?'))

micro_b.excluir_p(3)

micro_b.curtir_postagem(1)
micro_b.curtir_postagem(1)
micro_b.curtir_postagem(2)

postagem_t = micro_b.postagem_mais_curtida()

if (postagem_t) {
    console.log("Postagem mais curtida: ")
    console.log(postagem_t)
} else {
    console.log("nenhuma postagem foi curtida até o momento!!!")
}

console.log(micro_b.toString_geral())