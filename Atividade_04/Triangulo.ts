class triangulo {
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


let t: triangulo = new triangulo(4, 3, 2)

if (!t.ehTriangulo()) {
    console.log("Não é um triangulo")
} else if (t.ehEquilatero()) {
    console.log("É equilátero!!")
} else if (t.ehIsosceles()) {
    console.log("É isosceles!!")
} else if (t.ehEscaleno()) {
    console.log("É escaleno!!")
}
