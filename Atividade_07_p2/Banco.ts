class Conta {

    private _numero: string
    private _saldo: number
    constructor(numero: string, saldo: number = 0) {
        this._numero = numero
        this._saldo = saldo
    }

    depositar(valor: number): void {
        if (valor < 0 || isNaN(valor)) {
            throw new ValorDepositoInvalido_Error("Valor inválido!!")
        }
        this._saldo += valor
    }

    sacar(valor: number): void {

        if (this._saldo < valor || valor < 0) {
            throw new SaldoInsuficiente_Error("Saldo insuficiente ou valor inválido, operação não realizada!!")
        }
        this._saldo -= valor
    }

    get saldo(): number {
        return this._saldo
    }

    get numero(): string {
        return this._numero
    }

    transferir(conta: Conta, valor: number): void {
        this.sacar(valor)
        conta.depositar(valor)
    }

    informacoes_da_conta(): string {
        const retorno: string = `
----- Informações da conta -----
Número da conta: ${this._numero}
saldo atual: ${this._saldo.toFixed(3)}
`
        return retorno
    }
}

class Poupanca extends Conta {
    private _taxaJuros: number;
    constructor(numero: string, taxaJuros: number, saldo: number = 0) {
        super(numero, saldo)
        this._taxaJuros = taxaJuros;
    }

    render_juros(): void {
        super.depositar(this.saldo + (this.saldo * this._taxaJuros / 100));
    }

    informacoes_da_conta(): string {
        let info = super.informacoes_da_conta();
        info += `Taxa de Juros: ${this.taxaJuros}%
Tipo da Conta: Conta Poupaça
`
        return info
    }

    get taxaJuros(): number {
        return this._taxaJuros;
    }

}

class ContaImposto extends Conta {
    private _taxaImposto: number;
    constructor(numero: string, taxaImposto: number, saldo: number = 0) {
        super(numero, saldo)
        this._taxaImposto = taxaImposto;
    }

    sacar(valor: number): void {
        const valor_saque = valor + (valor * this.taxaImposto / 100);
        return super.sacar(valor_saque);
    }

    informacoes_da_conta(): string {
        let info = super.informacoes_da_conta();
        info += `Taxa de Imposto: ${this.taxaImposto}%
Tipo da Conta: Conta Imposto
`
        return info
    }

    get taxaImposto(): number {
        return this._taxaImposto;
    }

}


class Banco {
    private contas: Conta[] = []

    inserir(conta: Conta): void {
        try {
            this.consultar_conta(conta.numero);
        } catch (e: any) {
            if (e instanceof ContaInexistenteError) {
                this.contas.push(conta)
            } else {
                console.log("Conta já existente..")
            }
        }
    }

    consultar_conta(numero: string): Conta {
        let conta!: Conta

        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                conta = this.contas[i]
                break
            }
        }
        if (!conta) {
            throw new ContaInexistenteError("Conta não encontrada..")
        }
        return conta
    }

    private consultar_index_conta(numero: string): number {
        let index: number = -1

        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                index = i
                break
            }
        }
        if (index == -1) {
            throw new ContaInexistenteError("Conta não encontrada..")
        }
        return index
    }

    alterar_conta(conta: Conta): void {
        let index: number = this.consultar_index_conta(conta.numero)
        this.contas[index] = conta
    }

    excluir_conta(conta: Conta): void {
        let index: number = this.consultar_index_conta(conta.numero)
        for (let i = index; i < this.contas.length - 1; i++) {
            this.contas[i] = this.contas[i + 1]
        }
        this.contas.pop()
    }

    depositar(numero: string, quantia: number): void {
        let conta: Conta = this.consultar_conta(numero)
        conta.depositar(quantia)
    }

    sacar(numero: string, quantia: number): void {
        let conta: Conta = this.consultar_conta(numero)
        conta.sacar(quantia)
    }

    transferir(numero_conta_1: string, numero_conta_2: string, quantia: number): void {
        let conta_manda: Conta = this.consultar_conta(numero_conta_1)
        let conta_recebe: Conta = this.consultar_conta(numero_conta_2)
        conta_manda.transferir(conta_recebe, quantia)
    }

    renderJuros(numero: string): void {
        const conta: Conta = this.consultar_conta(numero)
        if (!(conta instanceof Poupanca)) {
            throw new ContaInexistenteError("Conta não é do tipo Poupança")
        }
        conta.render_juros();
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

import { ValorInvalido as ValorDepositoInvalido_Error, SaldoInsuficiente as SaldoInsuficiente_Error, ContaInexistenteError } from './trata_erros.js'
export { Conta, Banco, Poupanca, ContaImposto }
