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

let auditoria: AuditoriaInterna = new AuditoriaInterna()

auditoria.adicionar(new ContaCorrente('marcos', 1000))
auditoria.adicionar(new ContaCorrente('mario', 1500))
auditoria.adicionar(new ContaCorrente('max', 1300))
auditoria.adicionar(new ContaCorrente('jose', 1900))
auditoria.adicionar(new SeguroDeVida())
auditoria.adicionar(new SeguroDeVida())
auditoria.adicionar(new SeguroDeVida())
auditoria.adicionar(new SeguroDeVida())


console.log(`Soma Tributos = ${auditoria.calcularTributos()}`)
