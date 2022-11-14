class Conta {

    private _numero: string
    private _saldo: number


    constructor(numero: string, saldo: number = 0) {
        this.validarNumero(numero)
        this._numero = numero
        this.validarValor(saldo)
        this._saldo = saldo
    }

    validarNumero(numero: string): void {
        const num: number = Number(numero)
        if (isNaN(num)) {
            throw new ValorInvalido_Error("O número da conta é inválido!!")
        }
    }

    validarValor(valor: number): void {
        if (valor < 0 || isNaN(valor)) {
            throw new ValorInvalido_Error("Erro, o valor inserido é inválido!!")
        }
    }

    depositar(valor: number): void {
        this.validarValor(valor)
        this._saldo += valor
    }

    sacar(valor: number): void {
        this.validarValor(valor)
        if (valor > this.saldo) {
            throw new SaldoInsuficiente_Error("Saldo insuficiente, operação cancelada!!")
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
                throw new contaJaExistente_Error(`Erro ao inserir a conta, já existe uma conta de número: ${conta.numero}`)
            }
        }
    }

    consultar_conta(numero: string): Conta {
        let conta!: Conta
        
        if (isNaN(Number(numero)) || numero == '') {
            throw new ValorInvalido_Error(`Erro, o número de conta inserido é inválido!!`)
        }

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
        const index: number = this.consultar_index_conta(conta.numero)
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
        const conta: Conta = this.consultar_conta(numero)
        conta.depositar(quantia)
    }

    sacar(numero: string, quantia: number): void {
        const conta: Conta = this.consultar_conta(numero)
        conta.sacar(quantia)
    }

    transferir(numero_conta_1: string, numero_conta_2: string, quantia: number): void {
        const conta_manda: Conta = this.consultar_conta(numero_conta_1)
        const conta_recebe: Conta = this.consultar_conta(numero_conta_2)
        conta_manda.transferir(conta_recebe, quantia)
    }

    renderJuros(numero: string): void {
        const conta: Conta = this.consultar_conta(numero)
        if (!(conta instanceof Poupanca)) {
            throw new ContaInvalidaError("Erro, a conta inserida não é do tipo Poupança")
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

import {
    ValorInvalido_Error, SaldoInsuficiente_Error,
    ContaInexistenteError, ContaInvalidaError,
    contaJaExistente_Error
} from './trata_erros.js'
export { Conta, Banco, Poupanca, ContaImposto }
