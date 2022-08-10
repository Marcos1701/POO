import { ordenar_vetor, pegar_numeros_sem_restricao } from './arq_auxiliar.js'


/*7. Escreva um programa que leia um vetor de inteiros 
de 5 posições e apresente-o na tela
de forma crescente e decrescente.*/


function main() {

    const vetor_1 = pegar_vetor()

    const vetor_ord_crescente = ordenar_vetor(vetor_1)
    console.log('vetor em ordem crescente: ')
    console.log(vetor_ord_crescente)


    const vetor_ord_decrescente = ordenar_vetor(vetor_1, 'desc')
    console.log('vetor em ordem decrescente: ')
    console.log(vetor_ord_decrescente)

}

function pegar_vetor() {
    const vetor = new Array(5)
    console.log('Digite os valores: ')

    for (let i = 0; i < vetor.length; i++) {
        vetor[i] = pegar_numeros_sem_restricao(`${i + 1}° valor : `)
    }
    return vetor
}


main()