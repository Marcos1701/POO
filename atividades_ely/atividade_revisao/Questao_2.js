import prompt from 'prompt-sync'
const input = prompt()

/*2. Escreva um programa para converter de real para bitcoin e exibir para o usuário a
resposta final. Considere até 8 casas decimais*/

function main() {

    console.log("Digite o valor a seguir: ")
    const valor_em_real = parseFloat(input('=> '))

    const valor_um_bitcoin = 118401.55

    console.log(`O valor digitado, convertido em bitcoin é igual a: `)
    console.log(`=> ${(valor_em_real/valor_um_bitcoin).toFixed(8)} bitcoin`)

}

main()