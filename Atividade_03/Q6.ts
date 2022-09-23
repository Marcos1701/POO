/*
6. Crie uma função exibir receba como parâmetro um “rest parameter” 
representando strings. A função deve exibir no log cada um dos 
elementos do “rest parameter”. Chame a função
usando diferentes quantidade de parâmetros conforme abaixo :
exibir(“a”, “b”) ; exibir(“a”, “b”, “c”) ; exibir(“a”, “b”, “c”, “d”) 
*/

function exibir(...parameter: string[]): void {
    for (let i = 0; i < parameter.length; i++) {
        console.log(parameter[i])
    }
}

exibir("a", "b")

exibir("\n", "a", "b", "c")

exibir("\n", "a", "b", "c", "d")
