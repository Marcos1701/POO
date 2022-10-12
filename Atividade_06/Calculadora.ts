class Calculadora { 

    private _op1: number
    private _op2: number

    constructor(_op1: number, _op2: number) {
        this._op1 = _op1
        this._op2 = _op2
    }

    adicao(): number {
        return this._op1 + this._op2
    }

    subtracao(): number {
        return this._op1 - this._op2
    }



    get op1(): number {
        return this._op1
    }

    get op2(): number {
        return this._op2
    }


}

const y: Calculadora = new Calculadora(1, 2)

y._op1 //A propriedade '_op1' é particular e somente é acessível na classe 'Calculadora'.
y._op2 //A propriedade '_op2' é particular e somente é acessível na classe 'Calculadora'.

console.log(`\nOp1: ${y.op1}, Op2: ${y.op2}\n`)

console.log(`Adição: ${y.adicao()}\n`)
console.log(`Subtração: ${y.subtracao()}`)
