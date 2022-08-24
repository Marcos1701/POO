/*8. Crie uma classe Circulo que possua um atributo raio. Crie dois métodos que
calculam a área e o perímetro. Instancie um objeto dessa classe, atribua um valor
ao raio e exiba a área e o perímetro chamando os dois métodos definidos.*/

class Circulo{
  raio: number = 0

  calcularArea(){
    return this.raio * (Math.pow(3.14, 2))
   }

   calcularPerimetro(){
    //C = 2 * π * r
     return 2 * (this.raio * 3.14)
   }
  
}

function main(){
  
  const circulo = new Circulo

  circulo.raio = 3

  console.log(`Área : ${circulo.calcularArea().toFixed(2)}`)
  console.log(`Perimetro : ${circulo.calcularPerimetro().toFixed(2)}`)

}

main()
