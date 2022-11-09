abstract class Funcionario{
    protected salario: number

    constructor(salario: number){
        this.salario = salario
    }

     getbonificacao(): number{
        return 1
     }
}

interface Autenticavel{
    autentica(login: string, senha: string): boolean
}

class Gerente extends Funcionario implements Autenticavel{
    private _login: string;
    private _senha: string;

    constructor(login: string, senha: string, salario: number){
        super(salario)
        this._login = login
        this._senha = senha
    }

    getbonificacao(): number {
        return this.salario * 1.4
    }
    get login(): string{
        return this._login
    }
    
    get senha(): string{
        return this._senha
    }

    autentica(login: string, senha: string): boolean {
        if(login == this.login && senha == this.senha){
            return true
        }
        return false
    }
}

class Diretor extends Funcionario implements Autenticavel{
    private _login: string;
    private _senha: string;

    constructor(login: string, senha: string, salario: number){
        super(salario)
        this._login = login
        this._senha = senha
    }
    getbonificacao(): number {
        return this.salario * 2.0
    }
    get login(): string{
        return this._login
    }
    
    get senha(): string{
        return this._senha
    }

    autentica(login: string, senha: string): boolean {
        if(login == this.login && senha == this.senha){
            return true
        }
        return false
    }
}

class Cliente implements Autenticavel{
    private _login: string;
    private _senha: string;

    constructor(login: string, senha: string){
        this._login = login
        this._senha = senha
    }

    get login(): string{
        return this._login
    }
    
    get senha(): string{
        return this._senha
    }

    autentica(login: string, senha: string): boolean {
        if(login == this.login && senha == this.senha){
            return true
        }
        return false
    }
}

class ControleInterno{
    autentica(Usuario: Autenticavel,login: string, senha: string): boolean {
        return Usuario.autentica(login, senha)
    }
}

// let x: Funcionario = new Funcionario(100)
let x: Gerente = new Gerente('1', '12',1001)
let x2: Diretor = new Diretor('2', '21',1001)
let Cli: Cliente = new Cliente('3', '211')

let ContInt: ControleInterno = new ControleInterno


console.log(x.getbonificacao());
console.log(x2.getbonificacao());

console.log(ContInt.autentica(x, '1', '12'))
console.log(ContInt.autentica(x2, '2', '21'))
console.log(ContInt.autentica(Cli,'3', '211'))


console.log(ContInt.autentica(x2, '2', '211'))
console.log(ContInt.autentica(x, '11', '12'))
console.log(ContInt.autentica(Cli,'3', '11'))