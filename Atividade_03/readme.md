# Exercício 03

**1. Crie uma função que recebe como parâmetro um número e retorna true se o número for                                         
par e false se for ímpar.**                                                                                                                 
-
**2. Crie uma função que recebe como parâmetro um número e retorna true se o número for                                                         
primo e false caso contrário.**                                                                                 
-
**3. Crie uma função que receba como parâmetros um nome e um pronome de tratamento                                                                              
opcional. Caso esse último não seja fornecido, deve ser considerado o valor “Sr”. Ao final,                                                             
imprima uma saudação semelhante a “Sra. Sávia”.**                                                                                                         
-
4. Crie uma função que retorne os números de um array passados por parâmetro separados                                                                                               
por traço (-) no formato string. Para isso, use o método forEach dos arrays.                                                              
-
5. Dada a função soma abaixo, tente executar os scripts das alternativas e exiba os eventuais                                                                 
resultados:                 
```
function soma(x: number, y?: any): number {
return x + y
}
```
a. console.log(soma(1, 2))                                                                                                                    ;
b. console.log(soma(1, "2"))                                                                                                                    ;
c. console.log(soma(1))                                                                                                                    ;
6. Crie uma função exibir receba como parâmetro um “rest parameter” representando strings.                                                              
A função deve exibir no log cada um dos elementos do “rest parameter”. Chame a função                                                              
usando diferentes quantidade de parâmetros conforme abaixo:                                                                                 
exibir(“a”, “b”)                                                                                                                    ;
exibir(“a”, “b”, “c”)                                                                                                                    ;
exibir(“a”, “b”, “c”, “d”)                                                                                                                    ;
7. Converta em arrow function a seguinte função:                                                                                 
```
function ola() {
console.log("Olá");
}
```

8. Dado método filter dos arrays, crie uma implementação usando arrow function que filtre                                                                                 
todos os elementos pares do array abaixo:                                                                                 
```
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
```
