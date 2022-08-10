import prompt from 'prompt-sync'
export const input = prompt()

export function pegar_numeros_sem_restricao(msg) {

    let valor = Number(input(msg))

    while (isNaN(valor)) {
        console.log('insira um valor válido a seguir: ')
        valor = Number(input(msg))
    }
    return valor
}

export function ordenar_vetor(vetor, org = 'cresc') {

    const tamanho = vetor.length - 1
    let valor_cont = false
    const funcao_auxiliar = org == 'cresc' ? eh_maior : eh_menor
    let aux
    let k = 0

    for (let i = 0; i < tamanho; i++) {
        valor_cont = false

        for (let n = 0; n < tamanho - k; n++) {
            if (funcao_auxiliar(vetor[n], vetor[n + 1])) {
                valor_cont = true
                aux = vetor[n]
                vetor[n] = vetor[n + 1]
                vetor[n + 1] = aux

            }
        }

        if (!valor_cont) {
            break
        }
        k++
    }

    return vetor
}

function eh_maior(valor_1, valor_2) {
    return valor_1 > valor_2
}

function eh_menor(valor_1, valor_2) {
    return valor_1 < valor_2
}