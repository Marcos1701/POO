## Exercício 07 – parte I

**1) Enumere os 3 tipos mais comuns de tratamento de erros e exemplifique com
códigos seus ou pesquisados na internet.**

R-

```
  // A resposta está no Arquivo: "Q1.md"
```

**2) Explique por que cada um dos 3 métodos acima possui limitações de uso.**

**3) Com o código repassado, implemente o como nos slides o lançamento da exceção
no método sacar e realize um teste para saques que deixariam o saldo negativo.**

**4) Crie duas contas e teste o método transferir de modo que a conta a ser debitada
não possua saldo suficiente. Explique o que ocorreu.**

**5) Instancie uma classe banco e crie duas contas. Adicione-as à instancia do banco.
Chame o método transferir novamente passando um valor que lance a exceção na
classe conta. Você considera que o lançamento da exceção foi “propagado” para o
método conta.transferir(), banco.transferir() e o método transferir do script app?
Como você avalia a confiabilidade dessa implementação.**

**6) Lance um erro no construtor e nos métodos sacar e depositar para que, caso o
valor passado seja menor que zero uma exceção seja lançada. Reexecute os
testes da questão anterior com valores que “passem” pelo saldo insuficiente, e
teste também a chamada dos métodos passando como parâmetro valores < 0.**
