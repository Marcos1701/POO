class Pessoa{
    private _nome: string
    private _sobrenome: string

    constructor(nome: string, sobrenome: string){
        this._nome = nome
        this._sobrenome = sobrenome
    }

    get nome(): string{
        return this._nome
    }
    get sobrenome(): string{
        return this._sobrenome
    }

    get nomeCompleto(): string{
        return `${this.nome} ${this.sobrenome}`
    }
}

class Funcionario extends Pessoa{

    private _matricula: string
    private _salario: number

    constructor(nome: string, sobrenome: string, matricula: string, salario: number){
        super(nome, sobrenome)
        this._matricula = matricula
        this._salario = salario
    }

    get matricula(): string{
        return this._matricula
    }
    get salario():number{
        return this._salario
    }
    calcularSalarioPrimeiraParcela(): number{
        //sendo 60% na primeira parcela
        if(this.salario >= 0){
            return this.salario * (60/100)
        }else{
            console.log("Erro, salário inválido!!!")
        }
        return 0
    }

    calcularSalarioSegundaParcela(): number {
        //40% na segunda parcela.
        if(this.salario >= 0){
            return this.salario * (40/100)
        }else{
            console.log("Erro, salário inválido!!!")
        }
        return 0
    }
}

class Professor extends Funcionario{
    private _titulacao: string
    
    constructor(nome: string, sobrenome: string, matricula: string, salario: number, titulacao: string){
        super(nome, sobrenome, matricula, salario)
        this._titulacao = titulacao
    }

    get titulacao(): string{
        return this._titulacao
    }

    calcularSalarioPrimeiraParcela(): number{
        return this.salario
    }

    calcularSalarioSegundaParcela(): number{
        return 0
    }

}

let pessoa: Pessoa = new Pessoa("Marcos", "Santos")
let func: Funcionario = new Funcionario("Marcos", "Santos", '123', 1500)
let prof: Professor = new Professor("Marcos", "Santos", '123', 1500, 'Estadual')

console.log(`\n------- Teste Classe Pessoa -------`)
console.log(`Nome: ${pessoa.nome}`)
console.log(`Sobrenome: ${pessoa.sobrenome}`)
console.log(`Nome Completo: ${pessoa.nomeCompleto}\n`)

console.log(`\n------- Teste Classe Funcionario -------`)
console.log(`Nome: ${func.nome}`)
console.log(`Sobrenome: ${func.sobrenome}`)
console.log(`Nome Completo: ${func.nomeCompleto}`)
console.log(`Matrícula: ${func.matricula}`)
console.log(`Salário: R$ ${func.salario}`)
console.log(`Valor Primeira Parcela: R$ ${func.calcularSalarioPrimeiraParcela()}`)
console.log(`Valor Segunda Parcela: R$ ${func.calcularSalarioSegundaParcela()}\n`)


console.log(`\n------- Teste Classe Professor -------`)
console.log(`Nome: ${prof.nome}`)
console.log(`Sobrenome: ${prof.sobrenome}`)
console.log(`Nome Completo: ${prof.nomeCompleto}`)
console.log(`Matrícula: ${prof.matricula}`)
console.log(`Titulação: ${prof.titulacao}`)
console.log(`Salário: R$ ${prof.salario}`)
console.log(`Valor Primeira Parcela: R$ ${prof.calcularSalarioPrimeiraParcela()}`)
console.log(`Valor Segunda Parcela: R$ ${prof.calcularSalarioSegundaParcela()}`)
