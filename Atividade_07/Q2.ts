export class Calculadora_v2 {
    private _item_1: number;
    private _item_2: number;

    constructor(item_1: number, item_2: number) {
        this._item_1 = item_1;
        this._item_2 = item_2;
    }
    get item_1() {
        return this._item_1;
    }

    // set item_1(item: number) {
    //     this._item_1 = item;
    // }

    get item_2() {
        return this._item_2;
    }

    // set item_2(item: number) {
    //     this._item_2 = item;
    // }

    soma(): number {
        return this._item_1 + this._item_2;
    }

    subtracao(): number {
        return this._item_1 - this._item_2;
    }

    multiplicacao(): number {
        return this._item_1 * this._item_2;
    }

    divisao(): number {
        return this._item_1 / this._item_2;
    }
}

// const Teste: Calculadora_v2 = new Calculadora_v2(10, 15);


// console.log(`Soma: ${Teste.item_1} + ${Teste.item_2} = ${Teste.soma()}`);
// console.log(`Subtração: ${Teste.item_1} - ${Teste.item_2} = ${Teste.subtracao()}`);
// console.log(`Multiplicação: ${Teste.item_1} * ${Teste.item_2} = ${Teste.multiplicacao()}`);
// console.log(`Divisão: ${Teste.item_1} / ${Teste.item_2} = ${Teste.divisao()}`);
