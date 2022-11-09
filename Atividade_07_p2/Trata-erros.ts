class AplicacaoError extends Error {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

class ContaInexistenteError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem)
    }

    inserir_novamente(b: Banco): void {
        console.log("Deseja inserir outra conta? ")
        const resposta: number = Number(input("Digite '1' para sim ou '0' para não: "))

        if (resposta == 1) {
            inserir_Contas(b)
        }
    }
}

function menuContas(): void {
    console.log(`---- Criar Conta ---
        1 - Conta
        2 - Conta Poupança
        3 - Conta Imposto`)
}


function inserir_Contas(b: Banco): void {

    menuContas();
    let op = Number(input("=> "));

    while (op > 3 || op < 1) {
        console.log('Opção inválida!!')
        menuContas();
        op = Number(input("=> "));
    }

    let numero: string = input("Digite o número da conta: ")
    let saldo: number = Number(input("Digite o saldo da conta: "))

    if (op == 1) {
        let conta: Conta = new Conta(numero, saldo)
        b.inserir(conta)
    } else if (op == 2) {
        const taxa_juros = Number(input("Digite a Taxa de Juros: "))
        let conta_P: Poupanca = new Poupanca(numero, saldo, taxa_juros)
        b.inserir(conta_P)
    } else {
        const taxa_Imposto = Number(input("Digite a Taxa de Imposto: "))
        let conta_I: ContaImposto = new ContaImposto(numero, saldo, taxa_Imposto)
        b.inserir(conta_I)
    }

}

class SaldoInsuficiente_Error extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

class ValorInvalido_Error extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem)
    }
}
import { Banco, Conta, ContaImposto, Poupanca } from './new_Banco.js'
import prompt from 'prompt-sync'
const input = prompt()
export { ValorInvalido_Error as ValorInvalido, SaldoInsuficiente_Error as SaldoInsuficiente, ContaInexistenteError }
