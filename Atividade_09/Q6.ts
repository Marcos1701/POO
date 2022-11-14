abstract class Funcionario {
    protected nome: string
    protected salario: number


    constructor(nome: string, salario: number) {
        this.salario = salario
        this.nome = nome
    }

    getbonificacao(): number {
        return 1
    }
}


class Gerente extends Funcionario {

    constructor(nome: string, salario: number) {
        super(nome, salario)
    }

    getbonificacao(): number {
        return this.salario * 1.4
    }
}

class Diretor extends Funcionario {

    constructor(nome: string, salario: number) {
        super(nome, salario)
    }
    getbonificacao(): number {
        return this.salario * 1.6
    }
}

class presidente extends Funcionario {

    constructor(nome: string, salario: number) {
        super(nome, salario)
    }
    getbonificacao(): number {
        return (this.salario * 2.0) + 1000
    }
}
