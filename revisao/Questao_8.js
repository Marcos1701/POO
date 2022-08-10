import { input } from './arq_auxiliar.js'

/*8. Escreva um programa que leia um texto pelo teclado 
e remova todas as suas vogais
acentuadas por não acentuadas. Exiba a string resultante.*/

function main() {

    console.log('Digite o trecho/frase a seguir: ')
    const texto_entrada = input('- ')

    const string_retorno = remover_vogais_acentuadas(texto_entrada)

    console.log(string_retorno)
}

function remover_vogais_acentuadas(texto) {
    const vogais_acentuadas = ('áéíóúãõâêîôûÁÉÍÓÚÂÊÎÔÛÃÕàèìòùÀÈÌÒÙ').split('')
    const texto_retorno = texto.split('')

    for (let i = 0; i < texto_retorno.length; i++) {

        for (let k = 0; k < vogais_acentuadas.length; k++) {
            if (texto_retorno[i] === vogais_acentuadas[k]) {
                texto_retorno[i] = substituir_vogal(texto_retorno[i], k)
            }
        }
    }
    return texto_retorno
}

function substituir_vogal(indice) {

    if (indice == 0 || indice == 5 || indice == 7 || indice == 24) {
        return 'a'
    } else if (indice == 1 || indice == 8 || indice == 25) {
        return 'e'
    } else if (indice == 2 || indice == 9 || indice == 26) {
        return 'i'
    } else if (indice == 3 || indice == 6 || indice == 10 || indice == 27) {
        return 'o'
    } else if (indice == 4 || indice == 11 || indice == 28) {
        return 'u'
    } else if (indice == 12 || indice == 17 || indice == 22 || indice == 29) {
        return 'A'
    } else if (indice == 13 || indice == 18 || indice == 30) {
        return 'E'
    } else if (indice == 14 || indice == 19 || indice == 31) {
        return 'I'
    } else if (indice == 15 || indice == 20 || indice == 23 || indice == 32) {
        return 'O'
    } else if (indice == 16 || indice == 21 || indice == 33) {
        return 'U'
    }
}

main()