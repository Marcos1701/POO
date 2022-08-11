import { input } from './arq_auxiliar.js'


function main() {

    console.log('Digite o valor em R$ a seguir: ')
    const valor_inicial = Number(input('R$ '))

    console.log('Digite a taxa de juros em %: ')
    const juros = (Number(input('=> '))) / 100

    const vetor_valores = (calcular_retorno(valor_inicial, juros)).join(' - ')
    console.log(vetor_valores)
}

function calcular_retorno(valor_inicial, juros) {

    const vetor_valores = new Array(12)
    let valor_atual = valor_inicial

    vetor_valores[0] = valor_inicial

    for (let i = 1; i < vetor_valores.length; i++) {
        valor_atual = ((vetor_valores[i - 1] * juros) + valor_atual)
        vetor_valores[i] = (valor_atual).toFixed(2)
    }
    return vetor_valores
}

main()
