import { input } from './arq_auxiliar.js'


function main() {

    console.log('Digite o valor em milissegundos: ')
    const valor_ms = Number(input('=> '))

    converter_valor_em_ms(valor_ms)
}

function converter_valor_em_ms(valor) {
    let resto = 0
    const x = (8.64 * 10 ** 7)

    const dias = Math.round(valor / x)
    resto = valor % x

    const horas = Math.round(resto / 3600000)
    resto = resto % 3600000

    const minutos = Math.round(resto / 60000)
    resto = resto % 60000

    const segundos = Math.round(resto / 1000)

    console.log(`${dias} Dias:${horas} h:${minutos} min:${segundos} seg”.`)
}

main()