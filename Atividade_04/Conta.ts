
class Conta {
    numero: string;
    saldo: number;

    constructor(numero: string, saldo: number) {
        this.numero = numero
        this.saldo = saldo
    }

    depositar(valor: number): void {
        if (valor > 0) {
            this.saldo += valor
        } else {
            console.log("Erro, insira um valor positivo para deposito..")
        }
    }

    sacar(valor: number): void {

        if (this.saldo >= valor && valor > 0) {
            this.saldo -= valor
        } else {
            console.log("valor inválido")
        }
    }

    consultarSaldo(): number {
        return this.saldo
    }


    transferir(conta: Conta, valor: number): void {
        if (valor > 0 && this.saldo >= valor) {
            this.sacar(valor)
            conta.depositar(valor)
        } else {
            console.log("Valor inválido!!")
        }
    }
}


let c1: Conta = new Conta("1", 100);
let c2: Conta = new Conta("2", 100);
let c3: Conta;
c1 = c2;
c3 = c1;
c1.sacar(10);

c1.transferir(c2, 50);
console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());
console.log(c3.consultarSaldo());