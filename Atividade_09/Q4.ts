abstract class FiguraGeometrica {
    abstract calcularArea(): number;
    abstract calcularPerimetro(): number;
}

class Quadrado extends FiguraGeometrica {

    private lado: number
    constructor(lado: number) {
        super()
        this.lado = lado
    }

    calcularArea(): number {
        return this.lado * this.lado;
    }

    calcularPerimetro(): number {
        return this.lado * 4;
    }
}

class Retangulo extends FiguraGeometrica {

    private base: number
    private lado: number


    constructor(base: number, lado: number) {
        super()
        this.base = base
        this.lado = lado
    }

    calcularArea(): number {
        return this.base * this.lado
    }

    calcularPerimetro(): number {
        return 2 * (this.base + this.lado)
    }
}

class Triangulo extends FiguraGeometrica {

    private base: number
    private lado: number
    private altura: number

    constructor(base: number, lado: number, altura: number) {
        super()
        this.base = base
        this.lado = lado
        this.altura = altura
    }

    calcularArea(): number {
        return (this.base * this.altura) / 2
    }

    calcularPerimetro(): number {
        return this.base + this.lado + this.altura
    }
}
