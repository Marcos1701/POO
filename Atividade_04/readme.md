# Exercício 04

**1. Suponha uma classe Hotel que sirva apenas para guardar a quantidade de
solicitações de reservas feitas conforme abaixo:**
```
class Hotel {
quantReservas : number;
adicionarReserva() : void {
quantReservas++;
}
}
```

**Podemos afirmar que haverá um problema de compilação, pois a variável inteira não
foi inicializada previamente? Justifique.**

R- não haverá problema, mas o retorno/valor da variável será NaN, mas o typescrypt relata o erro: "A propriedade 'quantReservas' não tem                              
R- nenhum inicializador e não está definitivamente atribuída no construtor."                                                                                       .

**2. Ainda sobre a classe do exemplo anterior, considere o código abaixo:**
```
let hotel : Hotel = new Hotel(2);
console.log(hotel.quantReservas);
```

**Adicione o construtor que aceite um parâmetro inteiro e faça a inicialização do atributo
quantReservas.**

R- Nesse caso, a função "adicionarReserva()" funciona perfeitamente, pois a variável "quantReservas" é inicializada.

**3. Considere a classe Radio e as instruções que fazem seu uso abaixo:**

```
class Radio {
volume : number;
constructor(volume : number) {
this.volume = volume;
}
}
let r : Radio = new Radio();
r.volume = 10;
```

**Justifique o erro de compilação e proponha uma solução                                          .**

R- O erro de compilação ocorre por conta da falta de argumentos/parâmetros na criação de "r", pois é preciso enviar um valor para                             
R- inicializar a variável "volume"                                                                                                              .

**4. Considerando o uso da classe Conta apresentada em aula e seu uso abaixo:**

```
let c1: Conta = new Conta("1",100);
let c2: Conta = new Conta("2",100);
let c3: Conta;
c1 = c2;
c3 = c1;
c1.sacar(10);

c1.transferir(c2,50);
console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());
console.log(c3.consultarSaldo());
```

*a. Qual o resultado dos dois "prints"? Justifique sua resposta                                                                                                 .*

R- a saída resultante será                                                                                                                          : 
```
//90
//90
//90
```
R- isso ocorre, pois c1 e c3 são igualados a c2, ou seja, ambos começaram a apontar para o mesmo local/amazenamento na memória..

*b. O que acontece com o objeto para o qual a referência c1 apontava                                                                                                ?*

R- Será limpo/liberado pelo coletor de lixo, isso ocorre de forma automática a elementos que não possuem nenhuma variável                                             
R- "apontando" para ele                                                                                                                       .

**5. Crie uma classe chamada Saudacao que                                                                 :**

*a. Contenha um atributo chamado texto e outro chamado destinatario, ambos String                                                                                   ;*

*b. Crie um construtor que inicializa os dois atributos                                                                                                              ;*

*c. Crie um método obterSaudacao() que retorne a concatenação dos dois atributos. Ex: "Bom dia, João"                                                                ;*

*d. Instancie uma classe Saudacao e teste seu método obterSaudacao()                                                                                      .*

**6. Crie uma classe chamada Triangulo que                                                                                                                       :**

*a. Possua 3 atributos inteiros representando os lados                                                                                                      ;*

*b. Crie um método que retorna true se os lados formarem um triângulo de acordo com a regra: |b-c| < a < b+c                                                        ;*

*c. Crie 3 métodos: ehIsoceles(), ehEquilatero() e ehEscaleto() que retorne verdadeiro caso o triângulo seja um                                                       
dos tipos relacionados ao nome do método. Eles devem chamar antes de tudo, o método da questão b. e retornar false se esse método                                   
já retornar false também                                                                                                                                ;*

*d. Instancie classes Triangulo de diferentes lados e seus métodos                                                                                        .*

*7. Uma classe Equipamento com                                                                                                                                 :*

*a. um atributo ligado (tipo boolean                                                                                                                                 )*

*b. dois métodos liga() e desliga(). O método liga torna o atributo ligado true e o método desliga torna o atributo ligado false                                .*

*c. Crie um método chamado inverte(), que muda o status atual (se ligado, desliga...se desligado, liga                                                              )*

*d. Crie um método que estaLigado() que retorna o valor do atributo ligado                                                                                    .*

*e. Altere o comportamento dos métodos liga para caso o equipamento já esteja ligado, não ligue novamente. Faça o mesmo com o método desligar                        .*

*f. Instancie uma classe Equipamento e teste todos os seus métodos                                                                                                .*

**8. Altere a classe conta dos slides conforme as instruções abaixo                                                                                             :**

*a. Altere o método sacar de forma que ele retorne verdadeiro ou falso. Caso o saque deixe saldo negativo, o mesmo não será                                         
realizado, retornando falso                                                                                                                                     ;*

*b. Altere o método transferir() para que retorne também um valor lógico e que não seja feita a transferência caso o sacar()                                    
na conta origem não seja satisfeito                                                                                                                               ;*

*c. Verifique as diferentes operações implementadas                                                                                                         .*

**9. Crie uma classe chamada Jogador e nela                                                                                                               :**

*a. Crie 3 atributos inteiros representando força, nível e pontos atuais                                                                                    ;*

*b. Crie um construtor no qual os 3 parâmetros são passados e inicialize os respectivos atributos                                                               ;*

*c. Crie um método chamado calcularAtaque. Nele, calcule e retorne o valor da multiplicação de força pelo nível. Esse resultado                                    
é o dano de ataque do jogador                                                                                                                                   ;*

*d. Crie um método chamado atacar em que é passado um outro jogador (atacado) como parâmetro. Nele e é feita a subtração do dano (método                              
calcularAtaque) dos pontos do atacado                                                                                                                         ;*

*e. Crie um método chamado estaVivo que retorna true caso o atributo pontos do jogador seja maior que zero e falso caso contrário                               .*

*f. Altere o método atacar para usar o método está vivo e desconsiderar a operação, ou seja, não atacar, caso o jogador passado por                               
parâmetro não esteja vivo                                                                                                                                       .*

*g. Crie um método chamado toString() que retorna a representação textual do produto concatenando todos os seus atributos                                         .*
h. Avalie em com testes dois jogadores instanciados e inicializados através do construtor. Utilize o método de ataque de cada jogador e                             
ao final, verifique qual jogador tem mais pontos                                                                                                                .*

**10. A abordagem da questão 5 é retornar códigos de erro ou acerto. Já a da questão 6.f. é desconsiderar a alteração. Quais das duas você acha mais correta?
Compare com seus códigos escritos em outras disciplinas                                                                                             .**
