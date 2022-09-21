/*
   Crie uma função que receba como parâmetros um nome e 
   um pronome de tratamento opcional. Caso esse último 
   não seja fornecido, deve ser considerado o valor “Sr”.
   Ao final, imprima uma saudação semelhante a “Sra. Sávia”.
*/

import Prompt from 'prompt-sync'
const input = Prompt()

function gerar_saudacao(nome: string, pronome: string = "M"): string {

    if (pronome === "M") {
        return `Olá Sr. ${nome}`
    } else {
        return `Olá Sra. ${nome}`
    }
}

function main() {

    console.log("Digite seu nome a seguir: ")
    const nome: string = input("=> ")

    console.log("Digite o seu pronome a seguir:  (M - MASC, F - FEM)")
    const pronome: string = input("=> ")

    if (pronome === "M" || pronome === "F") {
        console.log(gerar_saudacao(nome, pronome))
    } else {
        console.log(gerar_saudacao(nome))
    }

}

main()
