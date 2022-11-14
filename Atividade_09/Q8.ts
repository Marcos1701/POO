interface figuraGeometrica {
    CalcularArea(): number;
    CalcularPerimetro(): number;
}

interface IComparavel {
    comparar(fig_geo: figuraGeometrica): number;
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

    comparar(fig_geo: figuraGeometrica): number {
        if (this.CalcularArea() > fig_geo.CalcularArea()) {
            return 1;
        } else if (this.CalcularArea() < fig_geo.CalcularArea()) {
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

    comparar(fig_geo: figuraGeometrica): number {
        if (this.CalcularArea() > fig_geo.CalcularArea()) {
            return 1;
        } else if (this.CalcularArea() < fig_geo.CalcularArea()) {
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

    comparar(fig_geo: figuraGeometrica): number {
        if (this.CalcularArea() > fig_geo.CalcularArea()) {
            return 1;
        } else if (this.CalcularArea() < fig_geo.CalcularArea()) {
            return -1;
        } else {
            return 0;
        }
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

class Comparar_fig {
    comparar(fig_geo: IComparavel, fig_geo2: figuraGeometrica) {
        return fig_geo.comparar(fig_geo2)
    }
}


let t: triangulo = new triangulo(2, 3, 4)
let q: quadrado = new quadrado(2)
let ret: retangulo = new retangulo(2, 4)

let testador: Comparar_fig = new Comparar_fig()

let valor: number = testador.comparar(q, t)

console.log('----- Comparando a área do triangulo com a do quadrado -----')
if (valor == 1) {
    console.log("O triangulo 't' possui uma área maior que o quadrado 'q'")
} else if (valor == 0) {
    console.log("A área do triangulo 't' é igual a do quadrado 'q'")
} else {
    console.log("A área do quadrado 'q' é maior que a do triangulo 't'")
}

valor = testador.comparar(q, ret)

console.log('----- Comparando a área do quadrado com a do retangulo -----')
if (valor == 1) {
    console.log("O quadrado 'q' possui uma área maior que o retangulo 'ret'")
} else if (valor == 0) {
    console.log("O quadrado 'q' possui uma área igual a do retangulo 'ret'")
} else {
    console.log("O quadrado 'q' possui uma área menor que o retangulo 'ret'")
}

valor = testador.comparar(t, ret)

console.log('----- Comparando a área do triangulo com a do retangulo -----')
if (valor == 1) {
    console.log("O triangulo 't' possui uma área maior que o retangulo 'ret'")
} else if (valor == 0) {
    console.log("A área do triangulo 't' é igual a do retangulo 'ret'")
} else {
    console.log("A área do retangulo 'ret' é maior que a do triangulo 't'")
}
