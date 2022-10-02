class Conta {
    numero: string;
    saldo: number;

    constructor(numero: string, saldo: number) {
        this.numero = numero
        this.saldo = saldo
    }

    depositar(valor: number): void {
        if (valor > 0) {
            this.saldo += valor
        } else {
            console.log("Erro, insira um valor positivo para deposito..")
        }
    }

    sacar(valor: number): boolean {

        if (this.saldo >= valor && valor > 0) {
            this.saldo -= valor
        } else {
            return false
        }
        return true
    }

    consultarSaldo(): number {
        return this.saldo
    }


    transferir(conta: Conta_B, valor: number): boolean {
        if (this.sacar(valor)) {
            conta.depositar(valor)
        } else {
            return false
        }
        return true
    }
}


class Banco {
    contas: Conta_B[] = []

    inserir(conta: Conta): void {
        if (!this.consultar_conta(conta.numero)) {
            this.contas.push(conta)
        } else {
            console.log("Erro, já existe uma conta com esse número cadastrada!!!")
        }
    }

    consultar_conta(numero: string): Conta_B {
        let conta!: Conta_B

        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                conta = this.contas[i]
                break
            }
        }

        return conta
    }

    consultar_index_conta(numero: string): number {
        let index: number = -1

        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                index = i
                break
            }
        }

        return index
    }

    alterar_conta(conta: Conta_B): boolean {
        let index: number = this.consultar_index_conta(conta.numero)

        if (index != -1) {
            this.contas[index] = conta
            return true
        }

        return false
    }

    excluir_conta(conta: Conta_B): boolean {
        let index: number = this.consultar_index_conta(conta.numero)

        if (index != -1) {
            for (let i = index; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1]
            }
            this.contas.pop()

            return true

        }

        return false
    }

    depositar(numero: string, quantia: number): void {
        let conta: Conta_B = this.consultar_conta(numero)

        if (conta) {
            conta.depositar(quantia)
        }
    }

    sacar(numero: string, quantia: number): boolean {
        let conta: Conta_B = this.consultar_conta(numero)

        if (conta) {
            return conta.sacar(quantia)
        }
        return false
    }

    transferir(numero_conta_1: string, numero_conta_2: string, quantia: number): boolean {
        let conta_manda: Conta_B = this.consultar_conta(numero_conta_1)
        let conta_recebe: Conta_B = this.consultar_conta(numero_conta_2)

        if (conta_manda && conta_recebe) {
            return conta_manda.transferir(conta_recebe, quantia)
        }

        return false
    }

    qtd_contas(): number {
        return this.contas.length
    }

    Soma_saldo(): number {
        let valor: number = 0

        for (let conta of this.contas) {
            valor += conta.saldo
        }

        return valor
    }

    media_saldo(): number {
        let media: number = (this.Soma_saldo()) / (this.qtd_contas())

        return media
    }

}

let b_b: Banco = new Banco()

b_b.inserir(new Conta('1', 100))
b_b.inserir(new Conta('2', 400))
b_b.inserir(new Conta('1', 150))
b_b.inserir(new Conta('3', 200))

console.log(b_b.consultar_conta('1'))

b_b.alterar_conta(new Conta('1', 500))

b_b.depositar('1', 400)

b_b.sacar('1', 200)

b_b.transferir('1', '2', 100)

b_b.excluir_conta(b_b.consultar_conta('1'))

console.log(b_b.consultar_conta('1'))
console.log(b_b.consultar_conta('2'))
console.log(b_b.consultar_conta('3'))
console.log(`Média : ${b_b.media_saldo()}`)