## Atividade extra 03

**Proponha uma implementação com as seguintes diretrizes:**

**1) Em uma batalha temos dois elementos:**

*a. Guerreiros possuem os atributos id, descrição, força de ataque e “life” começando
com valor 10;*

*b. Bases militares possuem os atributos: id, localização x e y e percentual de danos
começando com 0.*

**2) Guerreiros e bases militares devem implementar a interface:**

```
interface Defensivel {
estaEliminado(): boolean;
defenderAtaque(valorAtaque: number);
}
```

**3)  O método defenderAtaque() deve ter distintos comportamentos:**

*a. Em um guerreiro deve subtrair o valor do ataque diretamente do seu atributo life;*

*b. Em uma base militar aumenta do seu percentual de danos com o valor do ataque
passado como parâmetro.*

**4) Um guerreiro possui um método chamado atacar que recebe um “Defensivel” e
chama o método defensivel.defenderAtaque(this.forcaAtaque).**

**5) O método estaEliminado() deve ter diferentes comportamentos:**

*a. Em guerreiro: deve retornar true caso o seu life esteja zerado. Deve retornar false
caso contrário;*

*b. Em base militar: deve retornar true caso o % de dano esteja maior ou igual a 90%.*

**6) Lance uma exceção do tipo JaEliminadoException caso o método atacar seja aplicado
a um Defensivel já eliminado. Simule e trate um caso concreto capturando a exceção no
script da última questão.**

**7) Crie uma classe chamada CenarioDeBatalha que possui um método chamado avaliar
em que dois arrays de defensíveis são passados como parâmetro. Crie uma regra “da sua
cabeça” que avalie quem ganhou uma batalha considerando o número de defensíveis
eliminados. Atribua pesos distintos no “placar” para defensíveis do tipo guerreiro ou base
militar. O método deve retornar uma string informando que exército foi vencedor.**

**8) Crie um script de testes que tenha crie diferentes classes instanciadas, os métodos
atacar dos guerreiros sejam chamados e chame o método de avaliar batalha da classe
CenarioDeBatalha passando dois arrays como exércitos.**
