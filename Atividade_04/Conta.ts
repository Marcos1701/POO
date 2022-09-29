
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

    sacar(valor: number): boolean {

        if (this.saldo >= valor && valor > 0) {
            this.saldo -= valor
        } else {
            return false
        }
        return true
    }

    consultarSaldo(): number {
        return this.saldo
    }


    transferir(conta: Conta, valor: number): boolean {
        if (this.sacar(valor)) {
            conta.depositar(valor)
        } else {
            return false
        }
        return true
    }
}


let c1: Conta = new Conta("1", 100);
let c2: Conta = new Conta("2", 100);
let c3: Conta;
c1 = c2;
c3 = c1;
if (c1.sacar(101)) {
    console.log("Saque realizado com sucesso")
} else {
    console.log("Saque não realizado, um valor inválido ou maior que o seu saldo foi inserido!!!")

}


if (c1.transferir(c2, 120)) {
    console.log("Tranferencia realizada com sucesso!!")
} else {
    console.log("Transferencia não realizado, um valor inválido ou maior que o seu saldo foi inserido!!!")

}


console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());
console.log(c3.consultarSaldo());
