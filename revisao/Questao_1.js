import { input } from './arq_auxiliar.js'
/*Escreva um programa que possua uma variável com um número ponto flutuante e
mostre seu antecessor e sucessor, ambos inteiros.*/
function main() {

    const num_float = parseFloat(input("Digite o número a seguir: "))

    const antecessor = Math.floor(num_float)
    const sucessor = Math.floor(num_float + 1)

    console.log(`O antecessor desse número é : ${antecessor}`)
    console.log(`O sucessor desse número é : ${sucessor}`)

}

main()