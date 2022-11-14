interface figuraGeometrica {
    CalcularArea(): number;
    CalcularPerimetro(): number;
}

class quadrado implements figuraGeometrica {

    private lado: number
    constructor(lado: number) {
        this.lado = lado
    }

    CalcularArea(): number {
        return this.lado * this.lado;
    }

    CalcularPerimetro(): number {
        return this.lado * 4;
    }
}

class retangulo implements figuraGeometrica {

    private base: number
    private lado: number


    constructor(base: number, lado: number) {
        this.base = base
        this.lado = lado
    }

    CalcularArea(): number {
        return this.base * this.lado
    }

    CalcularPerimetro(): number {
        return 2 * (this.base + this.lado)
    }
}

class triangulo implements figuraGeometrica {

    private base: number
    private lado: number
    private altura: number

    constructor(base: number, lado: number, altura: number) {
        this.base = base
        this.lado = lado
        this.altura = altura
    }

    CalcularArea(): number {
        return (this.base * this.altura) / 2
    }

    CalcularPerimetro(): number {
        return this.base + this.lado + this.altura
    }
}

class calculaArea_e_Perimetro {
    CalcularArea(fig_geo: figuraGeometrica) {
        return fig_geo.CalcularArea()
    }

    CalcularPerimetro(fig_geo: figuraGeometrica) {
        return fig_geo.CalcularPerimetro()
    }
}


let fig_geo: calculaArea_e_Perimetro = new calculaArea_e_Perimetro()
let t: triangulo = new triangulo(2, 3, 4)
let q: quadrado = new quadrado(2)
let ret: retangulo = new retangulo(2, 4)

console.log(`A area do triangulo 't' é ${fig_geo.CalcularArea(t)}`)
console.log(`A area do quadrado 'q' é ${fig_geo.CalcularArea(q)}`)
console.log(`A area do retangulo 'ret' é ${fig_geo.CalcularArea(ret)}`)

console.log(`\nO perimetro do triangulo 't' é ${fig_geo.CalcularPerimetro(t)}`)
console.log(`O perimetro do quadrado 'q' é é ${fig_geo.CalcularPerimetro(q)}`)
console.log(`O perimetro do retangulo 'ret' é ${fig_geo.CalcularPerimetro(ret)}`)
