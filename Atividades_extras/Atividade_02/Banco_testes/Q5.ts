/*5) Instancie uma classe banco e crie duas contas. Adicione-as à instancia do banco. 
Chame o método transferir novamente passando um valor que 
lance a exceção na classe conta. Você considera que o lançamento da exceção foi
 “propagado” para o método conta.transferir(), banco.transferir() e o método 
transferir do script app? Como você avalia a confiabilidade dessa implementação.*/

import { Conta, Banco } from "./Banco.js"

let b: Banco = new Banco();

let c: Conta = new Conta("1", 100)
let d: Conta = new Conta("2", 1000)

b.inserir(c)
b.inserir(d)

b.transferir("1", "2", 150) // Erro, insira um valor válido para o saque..

/* Isso ocorre por conta do tratamento feito no saque, em transferir na classe 
Conta e isso, por consequencia, se "propapa" para o transferir da classe Banco,
Logo trantando os erros de ambas com menos código e trabalho..*/
