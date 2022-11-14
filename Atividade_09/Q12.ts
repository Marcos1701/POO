interface Tributavel {
    calculaTributos(): number
}


class Conta {
    private _nome: string
    private _saldo: number

    constructor(nome: string, saldo: number) {
        this._nome = nome
        this._saldo = saldo
    }

    get nome(): string {
        return this._nome
    }

    set nome(nome: string) {
        this._nome = nome
    }

    get saldo(): number {
        return this._saldo
    }

    set saldo(saldo: number) {
        this._saldo = saldo
    }
}


class ContaCorrente extends Conta implements Tributavel {
    calculaTributos(): number {
        return this.saldo * 0.1
    }
}


class SeguroDeVida implements Tributavel {
    calculaTributos(): number {
        return 50
    }
}

class AuditoriaInterna {
    private List_Tribu: Tributavel[] = []

    adicionar(tribu: Tributavel) {
        this.List_Tribu.push(tribu)
    }

    calcularTributos(): number {
        let soma_tributos: number = 0
        for (let tribu of this.List_Tribu) {
            soma_tributos += tribu.calculaTributos()
        }
        return soma_tributos
    }
}


class Testes {
    inserir_valoresBase_em_uma_audi(auditoria: AuditoriaInterna, qtd: number, conta_base: ContaCorrente): number {
        let valor_total: number = 0
        for (let i = 0; i < qtd; i++) {
            valor_total += conta_base.saldo + 50
            auditoria.adicionar(new ContaCorrente(conta_base.nome, conta_base.saldo))
            auditoria.adicionar(new SeguroDeVida())
        }
        return valor_total
    }
}

let auditoria: AuditoriaInterna = new AuditoriaInterna()

let conta_base: ContaCorrente = new ContaCorrente("marck", 1000)

let aux: Testes = new Testes()

const valor_total: number = aux.inserir_valoresBase_em_uma_audi(auditoria, 10, conta_base)

console.log(`Valor Total obtido na auditoria: R$ ${valor_total.toFixed(2)}`)
console.log(`Soma Tributos: R$ ${auditoria.calcularTributos()}`)
