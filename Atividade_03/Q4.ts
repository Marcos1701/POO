/*
Crie uma função que retorne os números de um array 
passados por parâmetro separados por traço (-) no 
formato string. Para isso, use o método forEach dos 
arrays.
*/

function separa_num(vetor: number[]): string {
    let resultante: string = ''

    vetor.forEach(function (item) {
        resultante += `${item}-`
    })

    return resultante
}

function main() {

    const array: number[] = Array(5)

    for (let i = 0; i < array.length; i++) {
        array[i] = i + 1
    }

    const valores: string = separa_num(array)

    console.log(valores)
}

main()
