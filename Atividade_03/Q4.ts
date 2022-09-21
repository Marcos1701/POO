/*
Crie uma função que retorne os números de um array 
passados por parâmetro separados por traço (-) no 
formato string. Para isso, use o método forEach dos 
arrays.
*/

function separa_num(vetor: number[]) : string{
    let resultante: string

    resultante = vetor.forEach(elemento => `${elemento}-`)
}