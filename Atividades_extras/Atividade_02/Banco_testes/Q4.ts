//4) Crie duas contas e teste o método transferir de modo que a conta a ser debitada 
//não possua saldo suficiente. Explique o que ocorreu.

import { Conta } from "./Banco.js"

let c: Conta = new Conta("1", 100)
let b: Conta = new Conta("2", 100)


c.tranferir(b, 200) //Erro, insira um valor válido para o 
                    //saque..

/*isso ocorre quando tenta sacar a quantia na conta com saldo insuficiente e
o método sacar retorna o erro já configurado na questão anterior..*/
