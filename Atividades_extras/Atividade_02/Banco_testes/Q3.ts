// 3) Com o código repassado, implemente o como nos slides o lançamento da exceção
//no método sacar e realize um teste para saques que deixariam o saldo negativo.

import { Conta} from "./Banco.js"

let c: Conta = new Conta("1", 100)

c.sacar(110) // Erro, insira um valor válido para o 
saque..
