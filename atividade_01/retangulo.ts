/*7. Considerando o exemplo da classe Retangulo dos slides, implemente um método
adicional chamado que calcule o perímetro do retângulo e altere a classe
TestaRetangulo para exibir o cálculo do perímetro.*/

class Retangulo{
  l1: number = 0
  l2: number = 0

  calcularArea(){
    return (this.l1 * this.l2)
   }
  
  calcularPerimetro(){
    return (this.l1 * 2) + (this.l2 * 2)
  }

}

function main(){
  
  const retangulo = new Retangulo

  retangulo.l1 = 4
  retangulo.l2 = 6

  console.log(`Área : ${retangulo.calcularArea()}`)
  console.log(`Perimetro : ${retangulo.calcularPerimetro()}`)

}

main()
