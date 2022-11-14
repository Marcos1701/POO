interface figuraGeometrica {
    CalcularArea(): number;
    CalcularPerimetro(): number;
}

interface IComparavel {
    comparar_area(fig_geo: figuraGeometrica): number;
    comparar_perimetro(fig_geo: figuraGeometrica): number;
}

class quadrado implements figuraGeometrica, IComparavel {

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

    comparar_area(fig_geo: figuraGeometrica): number {
        if (this.CalcularArea() > fig_geo.CalcularArea()) {
            return 1;
        } else if (this.CalcularArea() < fig_geo.CalcularArea()) {
            return -1;
        } else {
            return 0;
        }
    }

    comparar_perimetro(fig_geo: figuraGeometrica): number {
        if (this.CalcularPerimetro() > fig_geo.CalcularPerimetro()) {
            return 1;
        } else if (this.CalcularPerimetro() < fig_geo.CalcularPerimetro()) {
            return -1;
        } else {
            return 0;
        }
    }
}

class retangulo implements figuraGeometrica, IComparavel {

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

    comparar_area(fig_geo: figuraGeometrica): number {
        if (this.CalcularArea() > fig_geo.CalcularArea()) {
            return 1;
        } else if (this.CalcularArea() < fig_geo.CalcularArea()) {
            return -1;
        } else {
            return 0;
        }
    }

    comparar_perimetro(fig_geo: figuraGeometrica): number {
        if (this.CalcularPerimetro() > fig_geo.CalcularPerimetro()) {
            return 1;
        } else if (this.CalcularPerimetro() < fig_geo.CalcularPerimetro()) {
            return -1;
        } else {
            return 0;
        }
    }
}

class triangulo implements figuraGeometrica, IComparavel {

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

    comparar_area(fig_geo: figuraGeometrica): number {
        if (this.CalcularArea() > fig_geo.CalcularArea()) {
            return 1;
        } else if (this.CalcularArea() < fig_geo.CalcularArea()) {
            return -1;
        } else {
            return 0;
        }
    }

    comparar_perimetro(fig_geo: figuraGeometrica): number {
        if (this.CalcularPerimetro() > fig_geo.CalcularPerimetro()) {
            return 1;
        } else if (this.CalcularPerimetro() < fig_geo.CalcularPerimetro()) {
            return -1;
        } else {
            return 0;
        }
    }
}


class classe_testadora {
    comparar_area(fig_geo: IComparavel, fig_geo2: figuraGeometrica) {
        return fig_geo.comparar_area(fig_geo2)
    }

    comparar_perimetro(fig_geo: IComparavel, fig_geo2: figuraGeometrica) {
        return fig_geo.comparar_perimetro(fig_geo2)
    }

    CalcularArea(fig_geo: figuraGeometrica) {
        return fig_geo.CalcularArea()
    }

    CalcularPerimetro(fig_geo: figuraGeometrica) {
        return fig_geo.CalcularPerimetro()
    }
}


let t: triangulo = new triangulo(2, 3, 4)
let q: quadrado = new quadrado(2)
let ret: retangulo = new retangulo(2, 4)

let testador: classe_testadora = new classe_testadora()

let valor: number = testador.comparar_area(q, t)

console.log("----- Comparando a área do triangulo 't' com a do quadrado 'q' -----\n")
if (valor == 1) {
    console.log("O triangulo 't' possui uma área maior que o quadrado 'q'")
} else if (valor == 0) {
    console.log("A área do triangulo 't' é igual a do quadrado 'q'")
} else {
    console.log("A área do quadrado 'q' é maior que a do triangulo 't'")
}

valor = testador.comparar_area(q, ret)

console.log("\n----- Comparando a área do quadrado 'q' com a do retangulo 'ret' -----\n")
if (valor == 1) {
    console.log("O quadrado 'q' possui uma área maior que o retangulo 'ret'")
} else if (valor == 0) {
    console.log("O quadrado 'q' possui uma área igual a do retangulo 'ret'")
} else {
    console.log("O quadrado 'q' possui uma área menor que o retangulo 'ret'")
}

valor = testador.comparar_area(t, ret)

console.log("\n----- Comparando a área do triangulo 't' com a do retangulo -----\n")
if (valor == 1) {
    console.log("O triangulo 't' possui uma área maior que o retangulo 'ret'")
} else if (valor == 0) {
    console.log("A área do triangulo 't' é igual a do retangulo 'ret'")
} else {
    console.log("A área do retangulo 'ret' é maior que a do triangulo 't'")
}


console.log("\n----- Comparando o perímetro do triangulo 't' com o do quadrado 'q'-----\n")

valor = testador.comparar_perimetro(t, q)

if (valor == 1) {
    console.log("O triangulo 't' possui um perímetro maior que o quadrado 'q'")
} else if (valor == 0) {
    console.log("O perímetro do triangulo 't' é igual ao do quadrado 'q'")
} else {
    console.log("O perímetro do quadrado 'q' é maior que o do triangulo 't'")
}
