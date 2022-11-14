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

let cc: ContaCorrente = new ContaCorrente('marcos', 1000)
let sv: SeguroDeVida = new SeguroDeVida()

console.log(`---- Conta Corrente teste ----`)
console.log(`Nome: ${cc.nome}
Saldo: ${cc.saldo}
Tributos: ${cc.calculaTributos()}`)

console.log("\n---- Seguro de Vida teste ----")

console.log(`Tributos: ${sv.calculaTributos()}`)
