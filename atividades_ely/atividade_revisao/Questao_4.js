import prompt from 'prompt-sync'
const input = prompt()
    /*4. Escreva um programa que apresente o mês por extenso, a partir de um número
digitado pelo usuário (entre 1 e 12) e a quantidade de dias do mês.*/

function main() {

    const num_mes = Number(input("Digite um valor entre 1 e 12: "))

    conferir_respectivo_mes(num_mes)

}

function conferir_respectivo_mes(numero) {
    if (numero === 1) {
        console.log('\nJaneiro, com 31 dias')
    } else if (numero === 2) {
        console.log('\nFevereiro, com 28 ou 29 Dias')
    } else if (numero === 3) {
        console.log('\nMarço, com 31 Dias')
    } else if (numero === 4) {
        console.log('\nAbril, com 30 Dias')
    } else if (numero === 5) {
        console.log('\nMaio, com 31 Dias')
    } else if (numero === 6) {
        console.log('\nJunho, com 30 Dias')
    } else if (numero === 7) {
        console.log('\nJulho, com 31 Dias')
    } else if (numero === 8) {
        console.log('\nAgosto, com 31 Dias')
    } else if (numero === 9) {
        console.log('\nSetembro, com 30 Dias')
    } else if (numero === 10) {
        console.log('\nOutubro, com 31 Dias')
    } else if (numero === 11) {
        console.log('\nNovembro, com 30 Dias')
    } else if (numero === 12) {
        console.log('\nDezembro, com 31 Dias')
    } else {
        console.log("\nvalor inválido!!")
    }
}

main()