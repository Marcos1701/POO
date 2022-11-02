/*6) Lance um erro no construtor e nos métodos sacar e depositar 
para que, caso o valor passado seja menor que zero uma exceção seja lançada.
 Reexecute os testes da questão anterior com valores que “passem” pelo saldo 
 insuficiente, e teste também a chamada dos métodos passando como parâmetro 
 valores < 0.*/

import { Conta, Banco } from "./Banco.js"

let b: Banco = new Banco();

let d: Conta = new Conta("2", 10) //Passa tranquilamente
// let c: Conta = new Conta("1", -10) //Apesenta o erro: Saldo inválido!!!!
let c: Conta = new Conta("1", 100)

// c.sacar(-10) //Erro, insira um valor válido para o saque..
// c.depositar(-1000) // Erro, insira um valor positivo para deposito..

b.inserir(c)
b.inserir(d)
// b.depositar('1', -1) //  Erro, insira um valor positivo para deposito..
b.depositar('1', 100)
// b.sacar("2", -10) //Erro, insira um valor válido para o saque..
b.sacar("2", 5)
// b.transferir("1", "2", 150)//Erro, insira um valor válido para o saque..
// b.transferir("1", "2", -15) //Erro, insira um valor válido para o saque..

b.transferir("1", "2", 90)

console.log(`Conta c: ${b.consultar_conta('1').saldo}`)
console.log(`Conta d: ${b.consultar_conta('2').saldo}`)
