import { pegar_numeros_sem_restricao } from './arq_auxiliar.js'

/*5. Escreva um programa que imprima os números 
inteiros entre dois valores lidos.*/

function main() {

    console.log('Digite o primeiro valor: ')
    const valor_1 = pegar_numeros_sem_restricao('=> ')
    console.log('Digite o segundo valor: ')
    const valor_2 = pegar_numeros_sem_restricao('=> ')

    const [menor_valor, maior_valor] = organizar_valores(valor_1, valor_2)

    for (let i = menor_valor + 1; i < maior_valor; i++) {
        console.log(i)
    }
}


function organizar_valores(valor_1, valor_2) {
    if (valor_1 > valor_2) {
        return [valor_2, valor_1]
    } else {
        return [valor_1, valor_2]
    }
}

main()