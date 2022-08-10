import prompt from 'prompt-sync'
const input = prompt()

/*8. Escreva um programa que leia um texto pelo teclado 
e remova todas as suas vogais
acentuadas por não acentuadas. Exiba a string resultante.*/

function main() {

    console.log('Digite o trecho/frase a seguir: ')
    const texto_entrada = input('=> ')

    const string_retorno = remover_vogais(texto_entrada)

    console.log(string_retorno)
}

function remover_vogais(texto) {

    let texto_retorno = ''
    for (let i = 0; i < texto.length; i++) {

        if (conferir_caractere(texto[i])) {
            texto_retorno += texto[i]
        }
    }
    return texto_retorno
}

function conferir_caractere(caractere) {
    const vogais_acentuadas = ('áéíóúãõâêîôûÁÉÍÓÚÂÊÎÔÛÃÕàèìòùÀÈÌÒÙ').split('')

    for (let i = 0; i < vogais_acentuadas.length; i++) {
        if (caractere == vogais_acentuadas[i]) {
            return false
        }
    }
    return true
}

main()
