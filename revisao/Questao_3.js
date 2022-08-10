import { input } from './arq_auxiliar.js'
/*3. Escrever um programa que leia três valores inteiros e apresente o maior e o menor dos
valores lidos*/

function main() {

    const valor_inicial = Number(input("1° valor: "))

    let maior_valor = valor_inicial
    let menor_valor = valor_inicial

    for (let x = 2; x <= 3; x++) {

        const valor_digitado = Number(input(`${x}° valor: `))

        if (valor_digitado > maior_valor) {
            maior_valor = valor_digitado
        }
        if (valor_digitado < menor_valor) {
            menor_valor = valor_digitado
        }
    }

    console.log(`Maior valor: ${maior_valor}`)
    console.log(`menor valor: ${menor_valor}`)

}

main()