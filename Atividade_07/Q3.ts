import { Calculadora_v2 } from './Q2.js';

class CalculadoraCientifica extends Calculadora_v2 {

    constructor(item_1: number, item_2: number) {
        super(item_1, item_2);
    }

    exponenciar(): number {
        return this.item_1 ** this.item_2
        // return this._item_1 ** this._item_2
    }

}

const T: CalculadoraCientifica = new CalculadoraCientifica(10, 3);

console.log(`Exponenciar: ${T.item_1}^${T.item_2} = ${T.exponenciar()}`)

//c. Foi necessária alguma modificação em Calculadora para o acesso aos atributos?
// R- Sim, pois como a classe CalculadoraCientifica herda apenas as caracteristicas de
// R- Calculadora, mas não possui acesso direto aos atributos privados estabelecidos na
// R- classe mãe. (não sei se é apenas o editor de código que está com onda, mas quando executo
// R- o arquivo .js, ele roda numa boa...)