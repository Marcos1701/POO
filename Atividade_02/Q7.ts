/*
7. Reescreva o exemplo abaixo, mantendo a quebra de linhas usando template
strings e os valores Ely, 120.56 e TypeScript venham de variáveis declaradas
separadamente e “interpoladas” na string:
Ely
My payment time is 120.56
and
my preffered language is TypeScript
*/

const nome: String = "Ely"
const payment_time: number = 120.56
const language: String = "TypeScript"

const retorno: String = `${nome}
My payment time is ${payment_time}
and
my preffered language is ${language}`

console.log(retorno)
