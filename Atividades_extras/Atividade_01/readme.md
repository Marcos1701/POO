# Exercício sobre Herança e Sobrescrita

**1. Dadas as três classes abaixo:**

```
class Empregado {
_salario: number = 500;
calcularSalario(): number { ...}
}

class Diarista extends Empregado {
calcularSalario(): number { ...}
}

class Horista extends Diarista {
calcularSalario(): number { ...}
}
```

*Implemente os métodos calcularSalario() de cada classe da seguinte forma:*

*a. Empregado: apenas retorna o valor do atributo salário;*

*b. Diarista: sobrescreve getSalario, chamando o método homônimo de
Empregado e dividindo o resultado por 30;*

*c. Horista: sobrescreve getSalario, chamando o método homônimo de Diarista
e dividindo o resultado por 24.*

**2. Crie uma classe Pessoa com:**

*a. Atributos privados _nome (tipo string) e _sobrenome (tipo string). Cada um
desses atributos deve ter métodos para lê-los (getters).*

*b. Um método get chamado nomeCompleto que não possui parâmetros de
entrada e que retorna a concatenação do atributo nome com o atributo
sobrenome.*

*c. Um construtor que recebe como parâmetros o nome e o sobrenome da
pessoa e inicializa respectivamente os atributos nome e sobrenome.*

**3. Crie uma subclasse de Pessoa, chamada Funcionario que deve possuir:**

*a. Os atributos privados _matricula do tipo string e _salario do tipo number,
com seus respectivos métodos para leitura.*

*b. O salário de um funcionário jamais poderá ser negativo. Todo funcionário
recebe seu salário em duas parcelas, sendo 60% na primeira parcela e
40% na segunda parcela. Assim, escreva os métodos
calcularSalarioPrimeiraParcela que retornam o valor da primeira parcela do
salário (60%) e calcularSalarioSegundaParcela que retorna o valor da
segunda parcela do salário (40%).*


**4. Uma subclasse de Funcionario, chamada Professor tendo:**

*a. Um atributo _titulacao (string) com seus métodos de leitura.*

*b. Todo professor recebe seu salário em uma única parcela. Assim, deve-se
sobrescrever os métodos calcularSalarioPrimeiraParcela e
calcularSalarioSegundaParcela. O método calcularSalarioPrimeiraParcela
da classe Professor deve retornar o valor integral do salário do professor e
o método calcularSalarioSegundaParcela do professor deve retornar o valor zero.*

**5. Crie testes de todos os métodos das classes das questões anteriores.**

