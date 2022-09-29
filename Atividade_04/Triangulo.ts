class Triangulo {
    a: number
    b: number
    c: number

    constructor(lado1: number, lado2: number, lado3: number) {
        this.a = lado1
        this.b = lado2
        this.c = lado3
    }

    ehTriangulo(): boolean {//|b-c| < a < b+c
        let a: number = this.a
        let b: number = this.b
        let c: number = this.c

        if (c > b) {
            return ((((b - c) * -1) < a) && a < (b + c))
        }

        return ((b - c) < a && a < (b + c))
    }

    ehIsosceles(): boolean {
        let a: number = this.a
        let b: number = this.b
        let c: number = this.c

        if (!this.ehTriangulo()) {
            return false
        }

        return ((a == b) || (b == c) || (a == c))
    }


    ehEquilatero(): boolean {
        let a: number = this.a
        let b: number = this.b
        let c: number = this.c

        if (!this.ehTriangulo()) {
            return false
        }

        return ((a == b) && (b == c))
    }


    ehEscaleno(): boolean {
        let a: number = this.a
        let b: number = this.b
        let c: number = this.c

        if (!this.ehTriangulo()) {
            return false
        }

        return ((a !== b) && (b !== c) && (a !== c))
    }

}


let escaleno: Triangulo = new Triangulo(4, 3, 2)
let equilatero: Triangulo = new Triangulo(3, 3, 3)
let isosceles: Triangulo = new Triangulo(3, 3, 1)
let falso_triangulo: Triangulo = new Triangulo(1, 2, 3)

conferir_triangulo(escaleno)
conferir_triangulo(equilatero)
conferir_triangulo(isosceles)
conferir_triangulo(falso_triangulo)

function conferir_triangulo(triangulo: Triangulo) {
    if (!triangulo.ehTriangulo()) {
        console.log("Não é um triangulo")
    } else if (triangulo.ehEquilatero()) {
        console.log("É equilátero!!")
    } else if (triangulo.ehIsosceles()) {
        console.log("É isosceles!!")
    } else if (triangulo.ehEscaleno()) {
        console.log("É escaleno!!")
    }
}
