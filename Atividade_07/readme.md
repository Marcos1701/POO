# Exercício 07

**1. As classes Carro, Veiculo e CarroEletrico são bem semelhantes. Reescreva as
classes usando herança para que os atributos duplicados não sejam mais
necessários.**

```
class Veiculo {
placa: String;
ano: number;
}
//-------------------------------
class Carro {
placa: String;
ano: number;
modelo: String;
}
//-------------------------------
class CarroEletrico {
placa: String;
ano: number;
modelo: String;
autonomiaBateria: number;
}

```

R-
```
   // A resposta está no arquivo "Q1.ts"
```

**2. Crie uma classe Calculadora com:**

*a. Dois tributos privados chamados representando dois operandos;*

R-
  ```
  //A resposta está no arquivo "Q2.ts"
  ```

*b. Crie um construtor que inicializa os atributos;*

R-
  ```
  //A resposta está no arquivo "Q2.ts"
  ```

*c. Crie um método que retorna a soma dos dois atributos;*

R-
  ```
  //A resposta está no arquivo "Q2.ts"
  ```

*d. Teste a classe.*

**3. Crie uma classe chamada CalculadoraCientifica que herda da classe Calculadora
do exercício passado e:**

*a. Implemente um método chamado exponenciar que retorne o primeiro
operando elevado ao segundo;*

R-
  ```
  //A resposta está no arquivo "Q3.ts"
  ```

*b. Teste a classe;*

R-
  ```
  //A resposta está no arquivo "Q3.ts"
  ```

*c. Foi necessária alguma modificação em Calculadora para o acesso aos atributos?*

```
    // R- Sim, pois como a classe CalculadoraCientifica herda apenas as caracteristicas de
    // R- Calculadora, mas não possui acesso direto aos atributos privados estabelecidos na
    // R- classe mãe. (não sei se é apenas o editor de código que está com onda, mas quando executo
    // R- o arquivo .js, ele roda numa boa...)
```

**4. Considerando a implementação da aplicação bancária, implemente:**

*a. Implemente na classe Banco o método renderJuros(numero: string): number, onde:*

*i. É passado por parâmetro o número de uma poupança e feita uma
consulta para ver se a conta existe. Note que a consulta não se
altera sendo Conta ou Poupança;*

*ii. Caso a poupança seja encontrada, teste se realmente se trata de
uma poupança com o operador instanceof, desconsidere a
operação caso contrário;*

*iii. Caso seja, faça um cast e invoque o método renderJuros da própria
instância encontrada;*

*iv. Teste o método da classe Banco passando tanto um número de
poupança como de conta passados inseridos anteriormente;*

*v. Altere a aplicação anteriormente sugerida para ter a opção de menu
“Render Juros”.*

*b. Adicione a aplicação para também permitir o cadastro da ContaImposto
feita em sala de aula;*

*c. Incremente a implementação da aplicação para recuperar de um arquivo
texto algumas contas, contas imposto e poupanças.*

**5. Suponha um sistema de controle de estoque de produtos e implemente:**

*a. Duas classes: Produto e ProdutoPerecivel;*

*b. A classe Produto tem atributos privados representando identificador, descrição, quantidade de produtos em estoque e valor unitário;*

*c. ProdutoPerecivel tem as mesmas características de Produto, porém possui a mais um atributo representando a data da validade
(https://www.javatpoint.com/typescript-date-object). Use herança;*

*d. Produto possui dois métodos para repor e dar baixa. A e ambos somam e
subtraem respectivamente uma quatidade passada por parâmetro do atributo quantidade;*

*e. Um produto perecível possui um método que diz se um produto está válido
ou não comparando sua data de validade com a data atual;*

*f. Use sobrescrita, ou seja, reescreva os métodos de inserir, repor e dar baixa
para que não seja possível executar a ação caso o produto não esteja na validade;*

*g. Crie uma classe chamada Estoque que possui um atributo privado representando um array de produtos (Produto ou ProdutoPerecivel);*

*h. Implemente métodos para inserir, consultar pelo atributo id, excluir, repor e dar baixa nos produtos na classe estoque;*

*i. Crie validações para não deixar serem incluídos produtos com mesmo id ou mesmo nome;*

*j. Os métodos repor e dar baixa na classe estoque chamam os métodos da classe produto finalmente alterar a quantidade;*

*k. Os vários métodos da classe devem levar em conta se o produto existe,
para isso, use o método consultar. Caso precise, crie métodos de consulta auxiliares;*

*l. Implemente um método que liste todos os produtos perecíveis vencidos.*
