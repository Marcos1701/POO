import { input } from './arq_auxiliar.js'

/*Escreva um programa que leia uma sequência 
de números inteiros terminada por –1 e
imprima na tela a soma e a média aritmética e o 
desvio padrão destes números. Obs: o
valor –1 é somente um terminador e não deve ser 
considerado nos cálculos.*/

function main() {

    const vetor_resultante = pegar_vetor()

    const soma_valores = pegar_somatorio_vetor(vetor_resultante)

    const media = soma_valores / vetor_resultante.length

    const desvio_padrao = Math.sqrt((soma_valores * ((vetor_resultante[0] - media) ** 2)) / vetor_resultante.length)

    console.log(`Média valores: ${media.toFixed(2)}`)
    console.log(`desvio padrão: ${desvio_padrao.toFixed(2)}`)
}

function pegar_vetor() {
    let vetor_retorno = []

    console.log('Digite os valores a seguir: ')
    let valor = Number(input('=> '))
    let i = 0

    while (valor !== -1) {
        vetor_retorno[i] = valor
        valor = Number(input('=> '))
        i++
    }
    console.log(vetor_retorno)
    return vetor_retorno
}

function pegar_somatorio_vetor(vetor) {

    let somatorio = 0

    for (let i = 0; i < vetor.length; i++) {
        somatorio += vetor[i]
    }

    return somatorio
}

main()