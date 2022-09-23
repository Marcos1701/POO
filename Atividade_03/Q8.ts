/*
8. Dado método filter dos arrays, crie uma implementação 
usando arrow function que filtre
todos os elementos pares do array abaixo :
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
*/


const eh_par = (x: number) => { return (x % 2 == 0) }

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const pares: number[] = array.filter(eh_par)

console.log(pares)
