import prompt from 'prompt-sync'
import { Banco } from '../Atv_05/Banco';
const input = prompt()

class Produto {
    private _id: string
    private _nome: string
    private _descicao: string
    private _quant_prod: number
    private _valor_unitario: number

    constructor(id: string, descicao: string, quant_prod: number
        , valor_unitario: number, nome: string) {
        this._id = id
        this._nome = nome
        this._descicao = descicao
        this._quant_prod = quant_prod
        this._valor_unitario = valor_unitario
    }

    get id(): string {
        return this._id
    }

    get nome(): string {
        return this._nome
    }

    get descrisao(): string {
        return this._descicao
    }


    get quant_prod(): number {
        return this._quant_prod
    }

    get valor_unitario(): number {
        return this._valor_unitario
    }

    repor(quant: number): void {
        this._quant_prod += quant
    }

    dar_baixa(quant: number): void {
        this._quant_prod -= quant
    }

}

class produtoPerecivel extends Produto {
    private _data_validade: Date

    constructor(id: string, descicao: string, quant_prod: number, valor_unitario: number
        , nome: string, data_validade: Date) {

        if (data_validade.getTime() < new Date().getTime()) {
            console.log('Produto vencido!!!')
        }
        super(id, descicao, quant_prod, valor_unitario, nome)
        this._data_validade = data_validade

    }

    get data_validade(): Date {
        return this._data_validade
    }

    eh_valido(): boolean {
        const data_atual: Date = new Date()

        return (this._data_validade.getTime() >= data_atual.getTime())
    }
    repor(quant: number): boolean {
        if (this.eh_valido()) {
            super.repor(quant)
            return true
        }
        return false
    }

    dar_baixa(quant: number): boolean {
        if (this.eh_valido()) {
            super.dar_baixa(quant)
            return true
        }
        return false
    }
}

class Estoque {
    private _Produtos: Produto[] = []

    inserir(produto: Produto): boolean {

        if (produto instanceof produtoPerecivel && !produto.eh_valido()) {
            return false
        }

        if (!this.consultar_por_id(produto.id) && !this.consultar_por_nome(produto.nome)) {
            this._Produtos.push(produto)
            return true
        }
        return false
    }

    consultar_produto(id: string): void {
        let produto!: Produto | produtoPerecivel
        for (let i = 0; i < this._Produtos.length; i++) {
            if (this._Produtos[i].id == id) {
                produto = this._Produtos[i]
            }
        }
        if (produto) {
            if (produto instanceof produtoPerecivel) {
                console.log(`- Tipo: Produto Perecível
- nome: ${produto.nome}
- id: ${produto.id}
- descrição: ${produto.descrisao}
- valor unitário: R$ ${produto.valor_unitario}
- Quantidade em estoque: ${produto.quant_prod} produtos
- Data de Validade: ${produto.data_validade.getDay()}-${produto.data_validade.getMonth()}-${produto.data_validade.getFullYear()}
`)
            } else {
                console.log(`- Tipo: Produto normal
- nome: ${produto.nome}
- id: ${produto.id}
- descrição: ${produto.descrisao}
- valor unitário: R$ ${produto.valor_unitario}
- Quantidade em estoque: ${produto.quant_prod} produtos
`)
            }
        } else {
            console.log("Produto não encontrado!!")
        }
    }

    private consultar_por_id(id: string): boolean {

        for (let i = 0; i < this._Produtos.length; i++) {
            if (this._Produtos[i].id == id) {
                return true
            }
        }
        return false
    }

    private consultar_por_nome(nome: string): boolean {

        for (let i = 0; i < this._Produtos.length; i++) {
            if (this._Produtos[i].nome == nome) {
                return true
            }
        }
        return false
    }

    private consultar_indice_prod(id: string): number {
        let index: number = -1;
        for (let i = 0; i < this._Produtos.length; i++) {
            if (this._Produtos[i].id == id) {
                index = i;
            }
        }
        return index
    }

    repor(id: string, quant: number): boolean {
        if (this.consultar_por_id(id)) {
            const index = this.consultar_indice_prod(id)
            this._Produtos[index].repor(quant)
            return true
        }
        console.log("Produto não encontrado!!..")
        return false
    }

    dar_baixa(id: string, quant: number): boolean {
        if (this.consultar_por_id(id)) {
            const index = this.consultar_indice_prod(id)
            this._Produtos[index].dar_baixa(quant)
            return true
        }
        console.log("Produto não encontrado!!..")
        return false
    }

    excluir(id: string): void {
        const index = this.consultar_indice_prod(id)
        if (index != -1) {
            for (let i = 0; i < this._Produtos.length; i++) {
                this._Produtos[i] = this._Produtos[i++]
            }
            this._Produtos.pop();
            console.log("produto excluído com sucesso!!!")
            return
        }
        console.log("Produto não encontrado!!!")
        return
    }

    consultar_pereciveis_vencidos(): void {
        console.log("----- Produtos Vencidos -----")
        for (let i = 0; i < this._Produtos.length; i++) {
            if (this._Produtos[i] instanceof produtoPerecivel &&
                !(<produtoPerecivel>this._Produtos[i]).eh_valido()) {

                console.log(`
- id: ${this._Produtos[i].id}
- nome: ${this._Produtos[i].nome}
- Data de Validade: ${(<produtoPerecivel>this._Produtos[i]).data_validade}
`)

            }
        }
        return;
    }
}


function main() {


    let estoque: Estoque = new Estoque()

    menu()
    let op: number = Number(input("=> "))

    while (op != 0) {
        if (op == 1) {
            menuInserir(estoque)
            input("\nPrecione <enter> para continuar...")
        } else if (op == 2) {
            console.log("---- Repor ----")
            const id: string = input("Digite o id do produto: ")
            const quant: number = Number(input("Digute a quantidade que será reposta: "))

            if (estoque.repor(id, quant)) {
                console.log("Produto foi reposto com sucesso!!")
            }
            input("\nPrecione <enter> para continuar...")
        } else if (op == 3) {
            console.log("---- darBaixa ----")
            const id: string = input("Digite o id do produto: ")
            const quant: number = Number(input("Digute a quantidade que será reposta: "))

            if (estoque.dar_baixa(id, quant)) {
                console.log("A operação ocorreu com sucesso!!")
            }
            input("\nPrecione <enter> para continuar...")
        } else if (op == 4) {
            console.log("----- Excluir -----")
            const id: string = input("Digite o id do produto: ")

            estoque.excluir(id)
            input("\nPrecione <enter> para continuar...")
        } else if (op == 5) {
            console.log("----- Consultar Produto -----")
            const id: string = input("Digite o id do produto: ")

            estoque.consultar_produto(id)
            input("\nPrecione <enter> para continuar...")
        } else if (op == 6) {
            estoque.consultar_pereciveis_vencidos()
            input("\nPrecione <enter> para continuar...")
        }

        menu()
        op = Number(input("=> "))
    }

}


function menu(): void {
    console.log(`----- Menu -----
1 - inserirProduto
2 - repor
3 - darBaixa
4 - excluirProduto
5 - consultarProduto
6 - consultar Perecíveis Fora de validade
    
    0 - Sair
`)
}

function menuInserir(e: Estoque) {
    let menu: string = (`----- InserirProd -----\n
1 - Produto (normal)
2 - Produto Perecivel
`)
    let cont: number = 1

    while (cont == 1) {
        console.log(menu)
        let op: number = Number(input("> "))

        while (op > 2 || op < 1) {
            console.log("Opção inválida!!")
            console.log(menu)
            op = Number(input("> "))
        }

        const id: string = input("Digite o id do produto: ")
        const nome: string = input("Digite o nome do produto: ")
        const descricao: string = input("Digite a descricao do Produto: ")
        const quantidade: number = Number(input("Digite a quantidade de produtos: "))
        const valor_uni: number = Number(input("Digite o valor unitario: R$ "))

        if (op == 1) {

            const produto: Produto = new Produto(id, descricao, quantidade, valor_uni, nome)
            if (e.inserir(produto)) {
                console.log("Produto inserido com sucesso!!")
            } else {
                console.log("Erro,produto invalido!!")
            }
        } else {

            let data: string = input("Digite a data de validade o produto (no formato: AAAA-MM-DD): ")
            const dataValidade: Date = new Date(data)
            const produto: produtoPerecivel = new produtoPerecivel(id, descricao, quantidade, valor_uni, nome, dataValidade)
            if (e.inserir(produto)) {
                console.log("Produto inserido com sucesso!!")
            } else {
                console.log("Erro,produto inválido!!")
            }
        }
        input("\nPrecione <enter> para continuar...")
        cont = Number(input("Deseja inserir mais um? (1-sim, 0-nao): "))
    }
}


main()